import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import 'dotenv/config';
import documentToText from './tools/documentToText';
import { abnormalCheck, dishonestCheck, illegalCheck } from './tools/qichacha';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.post('/documentToText', async (c) => {
  const { fileUrl } = await c.req.json();
  console.log('fileUrl->>>', fileUrl);
  return c.json({
    code: 0,
    data: await documentToText(fileUrl),
  });
});

// 失信核查
app.get('/qcc/dishonestCheck', async (c) => {
  const searchKey = c.req.query('searchKey');
  return c.json({
    code: 0,
    // @ts-ignore
    data: await dishonestCheck(searchKey),
  });
});

// 经营异常核查
app.get('/qcc/abnormalCheck', async (c) => {
  const searchKey = c.req.query('searchKey');
  return c.json({
    code: 0,
    // @ts-ignore
    data: await abnormalCheck(searchKey),
  });
});

// 严重违法核查
app.get('/qcc/illegalCheck', async (c) => {
  const searchKey = c.req.query('searchKey');
  return c.json({
    code: 0,
    // @ts-ignore
    data: await illegalCheck(searchKey),
  });
});

const port: any = process.env.PORT || 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
