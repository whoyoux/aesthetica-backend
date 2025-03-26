import { describe, test, expect } from 'bun:test'
import { hc } from 'hono/client'
import type { AppType } from '../src'
const client = hc<AppType>("http://localhost:3000/");

describe('hono app test', () => {
    test('/status', async () => {
        const res = await client.health.$get();
        const text = await res.text();
        expect(res.status).toBe(200);
        expect(text).toBe("ok");
    })
})