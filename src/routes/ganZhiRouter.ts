import express from 'express';
import { BirthInfo } from '../types';
import { calculateGanZhi, calculateProduct } from '../utils/ganZhiCalculator';

const router = express.Router();

router.post('/calculate', async (req: express.Request, res: express.Response) => {
  try {
    const birthInfo = req.body as BirthInfo;
    
    // if (!birthInfo.year || !birthInfo.month || !birthInfo.day || !birthInfo.name) {
    //   res.status(400).json({ error: '请提供完整的出生信息' });
    //   return;
    // }
    
    const date = new Date();

    // element result
    const elementResult = await calculateGanZhi(date.getFullYear(), date.getMonth() + 1, date.getDate());
    // product result
    const productResult = await calculateProduct(elementResult.element);

    res.json({
      name: birthInfo.name,
      ...elementResult,
      ...productResult
    });
  } catch (error) {
    res.status(500).json({ error: '哎呀～师傅打瞌睡啦！请您稍后再试试看～' });
  }
});

export default router;