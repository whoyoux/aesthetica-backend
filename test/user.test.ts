import { describe, test, expect } from "bun:test";
import { apiClient } from ".";

describe("user routes tests", () => {
	test("checking /me", async () => {
		const res = await apiClient.user.me.$get();
		expect(res.status).toBe(200);
	});
});
