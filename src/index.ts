import { Hono } from 'hono'
import { etag } from 'hono/etag'
import { logger } from 'hono/logger'

const app = new Hono()
app.use(etag(), logger())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/status', (c) => {
  return c.text('ok', 200)
})

export default app
