import { hc } from "hono/client";
import type { AppType } from "../src";

export const apiClient = hc<AppType>("http://localhost:3000/");
