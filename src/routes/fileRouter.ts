import express from 'express';
import { OssService } from '../utils/OssService';

const router = express.Router();
const ossService = new OssService();

// 获取文件URL
router.get('/url', async (req: express.Request, res: express.Response) => {
    try {
        const { fileName } = req.query;

        if (!fileName || typeof fileName !== 'string') {
            return res.status(400).json({ error: '请提供文件名' });
        }

        const fileUrl = await ossService.getFileUrl(fileName);
        return res.json({ url: fileUrl });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: '获取文件URL失败' });
    }
});

// 获取bucket信息
// router.get('/bucket-info', async (req: express.Request, res: express.Response) => {
//     try {
//         const info = await ossService.getBucketInfo();
//         return res.json(info);
//     } catch (error) {
//         console.error('Error:', error);
//         return res.status(500).json({ error: '获取存储空间信息失败' });
//     }
// });

// 列出文件
router.get('/files', async (req: express.Request, res: express.Response) => {
    try {
        const { prefix } = req.query;
        const files = await ossService.listFiles(prefix as string);
        return res.json(files);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: '获取文件列表失败' });
    }
});

export default router;
