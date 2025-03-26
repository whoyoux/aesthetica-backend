import { Hono } from "hono";
import type { AppVariables } from "..";

const userRoute = new Hono<AppVariables>().get("/me", (c) => {
	const session = c.get("session");
	const user = c.get("user");
	return c.json({ user, session }, 200);
});

export default userRoute;
