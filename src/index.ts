//aesthetica backend

import { Hono } from 'hono'
import { etag } from 'hono/etag'
import { logger } from 'hono/logger'
import { csrf } from 'hono/csrf'
import { cors } from 'hono/cors'
import healthRoute from './routes/health.route';

const app = new Hono()
  .use(csrf(), cors(), etag(), logger())
  .route("/health", healthRoute)

export type AppType = typeof app;
export default app
