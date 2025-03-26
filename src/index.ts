//aesthetica backend

import { Hono } from "hono";
import { etag } from "hono/etag";
import { logger } from "hono/logger";
import { csrf } from "hono/csrf";
import { cors } from "hono/cors";
import healthRoute from "./routes/health.route";
import { auth } from "./lib/auth";
import userRoute from "./routes/user.route";

export type AppVariables = {
	Variables: {
		user: typeof auth.$Infer.Session.user | null;
		session: typeof auth.$Infer.Session.session | null;
	};
};

const app = new Hono<AppVariables>()
	//MIDDLEWARES
	.use(csrf(), cors(), etag(), logger())
	// AUTH
	.use("*", async (c, next) => {
		const session = await auth.api.getSession({ headers: c.req.raw.headers });

		if (!session) {
			c.set("user", null);
			c.set("session", null);
			return next();
		}

		c.set("user", session.user);
		c.set("session", session.session);
		return next();
	})
	.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw))
	// ROUTES
	.route("/health", healthRoute)
	.route("/user", userRoute);

export type AppType = typeof app;
export default app;
