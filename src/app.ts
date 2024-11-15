import express from 'express';
import path from 'path';
import ganZhiRouter from './routes/ganZhiRouter';

const app = express();
app.use(express.static(path.join(__dirname, '../public')));

const port = process.env.PORT || 8035;

app.use(express.json());
app.use('/api/ganzhi', ganZhiRouter);

app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
}); 