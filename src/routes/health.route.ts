import { Hono } from "hono";
import { prisma } from "../lib/prisma";
import { checkDatabaseConnection } from "../lib/utils";

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
