import express from 'express';
import { BirthInfo } from '../types';
import GanzhiService from '../services/GanzhiService';

const router = express.Router();

router.post('/calculate', async (req: express.Request, res: express.Response) => {
  try {
    const birthInfo = req.body as BirthInfo;
    
    if (!birthInfo.year || !birthInfo.month || !birthInfo.day || !birthInfo.name) {
      res.status(400).json({ error: '请提供完整的信息' });
      return;
    }
    
    const result = await GanzhiService.calculate(birthInfo);
    res.status(200).json(result)  
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : '系统繁忙，请稍后再试'
    });
  }
});

export default router;