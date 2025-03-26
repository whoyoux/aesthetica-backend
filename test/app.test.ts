import { describe, test, expect } from "bun:test";
import { hc } from "hono/client";
import type { AppType } from "../src";

const client = hc<AppType>("http://localhost:3000/");

describe("aesthetica backend health test", () => {
	test("testing if app works", async () => {
		const res = await client.health.$get();
		const text = await res.text();
		expect(res.status).toBe(200);
		expect(text).toBe("ok");
	});

	test("testing database connection", async () => {
		const res = await client.health.db.$get();
		expect(res.status).toBe(200);
	});
});
