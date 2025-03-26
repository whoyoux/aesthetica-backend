import { Hono } from 'hono'

const healthRoute = new Hono()
    .get('/', (c) => {
        return c.text('ok', 200)
    });

export default healthRoute