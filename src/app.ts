import express, { Express } from 'express';
import path from 'path';
import ganZhiRouter from './routes/GanZhiRouter';
import fileRouter from './routes/fileRouter';
const app: Express = express();
app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json());
app.use('/api/ganzhi', ganZhiRouter);
app.use('/api/file', fileRouter);

// 只在非 Vercel 环境下启动服务器
const port = 8036;
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});

export default app;