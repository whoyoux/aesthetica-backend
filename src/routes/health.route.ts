import { Hono } from "hono";
import { prisma } from "../lib/prisma";
import type { PrismaClient } from "@prisma/client";

const healthRoute = new Hono()
	.get("/", async (c) => {
		return c.text("ok", 200);
	})
	.get("/db", async (c) => {
		const isConnected = await checkDatabaseConnection(prisma);
		if (isConnected) {
			return c.text("Database connection: OK", 200);
		}
		return c.text("Database connection: FAILED", 500);
	});

export default healthRoute;

async function checkDatabaseConnection(prisma: PrismaClient): Promise<boolean> {
	try {
		// Attempt to query the database.  A simple `SELECT 1` equivalent.
		await prisma.$queryRaw`SELECT 1`;
		return true; // Connection is good
	} catch (error) {
		console.error("Database connection error:", error);
		return false; // Connection failed
	} finally {
		await prisma.$disconnect(); // Ensure disconnection after the check
	}
}
