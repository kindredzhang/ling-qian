import express from 'express';
import ganZhiRouter from './routes/ganZhiRouter';

const app = express();
const port = process.env.PORT || 8035;

app.use(express.json());
app.use('/api/ganzhi', ganZhiRouter);

app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
}); 