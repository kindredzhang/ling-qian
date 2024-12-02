import express from 'express';
import { BirthInfo, GanZhiResult } from '../types';
import { calculateGanZhi } from '../utils/ganZhiCalculator';

const router = express.Router();

router.post('/calculate', async (req: express.Request, res: express.Response) => {
  try {
    const birthInfo = req.body as BirthInfo;
    
    if (!birthInfo.year || !birthInfo.month || !birthInfo.day || !birthInfo.name) {
      res.status(400).json({ error: '请提供完整的出生信息' });
      return;
    }
    
    const result = await calculateGanZhi(birthInfo.year);

    res.json({
      name: birthInfo.name,
      ...result
    });
  } catch (error) {
    res.status(500).json({ error: '哎呀～师傅打瞌睡啦！请您稍后再试试看～' });
  }
});

export default router;