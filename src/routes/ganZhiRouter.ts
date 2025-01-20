import express from 'express';
import { BirthInfo } from '../types';
import { calculateGanZhi, calculateProduct } from '../utils/ganZhiCalculator';

const router = express.Router();

router.post('/calculate', async (req: express.Request, res: express.Response) => {
  try {
    const birthInfo = req.body as BirthInfo;
    
    if (!birthInfo.year || !birthInfo.month || !birthInfo.day || !birthInfo.name) {
      res.status(400).json({ error: '请提供完整的信息' });
      return;
    }
    
    // 使用用户的出生日期和用户ID进行计算
    const elementResult = await calculateGanZhi(
      birthInfo.year, 
      birthInfo.month, 
      birthInfo.day,
      birthInfo.name
    );
    
    // 计算推荐结果
    const productResult = await calculateProduct(elementResult.element);

    res.json({
      name: birthInfo.name,
      ...elementResult,
      ...productResult
    });
  } catch (error) {
    res.status(500).json({ error: '系统繁忙，请稍后再试' });
  }
});

export default router;