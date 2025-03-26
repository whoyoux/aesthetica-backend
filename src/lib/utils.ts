import type { PrismaClient } from "@prisma/client";

export async function checkDatabaseConnection(
	prisma: PrismaClient,
): Promise<boolean> {
	try {
		// Attempt to query the database.  A simple `SELECT 1` equivalent.
		await prisma.$queryRaw`SELECT 1`;
		return true; // Connection is good
	} catch (error) {
		console.error("Database connection error:", error);
		return false; // Connection failed
	}
}
