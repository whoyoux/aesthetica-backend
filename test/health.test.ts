import { describe, test, expect } from "bun:test";
import { apiClient } from ".";

describe("health test", () => {
	test("testing if app works", async () => {
		const res = await apiClient.health.$get();
		const text = await res.text();
		expect(res.status).toBe(200);
		expect(text).toBe("ok");
	});

	test("testing database connection", async () => {
		const res = await apiClient.health.db.$get();
		expect(res.status).toBe(200);
	});
});
