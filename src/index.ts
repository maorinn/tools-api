import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import 'dotenv/config';
import documentToText from './tools/documentToText';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.post('/documentToText', async (c) => {
  const { fileUrl } = await c.req.json();
  return c.json({
    code: 0,
    data: await documentToText(fileUrl),
  });
});

const port: any = process.env.PORT || 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
