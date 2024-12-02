import OSS from 'ali-oss';
import dotenv from 'dotenv';

dotenv.config();

export class OssService {
    private client: OSS;

    constructor() {
        this.client = new OSS({
            region: process.env.OSS_REGION as string as string,
            accessKeyId: process.env.OSS_ACCESS_KEY_ID as string,
            accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET as string,
            bucket: process.env.OSS_BUCKET as string,
            endpoint: process.env.OSS_ENDPOINT as string,
            secure: true,
        });
    }

    // 获取文件访问URL
    async getFileUrl(objectName: string): Promise<string> {
        try {
            const result = await this.client.signatureUrl(objectName, {
                expires: 3600,
                response: {
                    'content-disposition': 'inline'
                }
            });
            return result;
        } catch (error) {
            console.error('获取文件URL失败:', error);
            throw error;
        }
    }

    // 列出文件
    async listFiles(prefix?: string) {
        try {
            const result = await this.client.list({
                prefix,
                'max-keys': 100
            }, {});
            return result;
        } catch (error) {
            console.error('获取文件列表失败:', error);
            throw error;
        }
    }

    // 上传文件
    async uploadFile(objectName: string, filePath: string, headers?: OSS.RequestOptions) {
        try {
            const result = await this.client.put(objectName, filePath, headers);
            return result;
        } catch (error) {
            console.error('上传文件失败:', error);
            throw error;
        }
    }

    // 删除文件
    async deleteFile(objectName: string) {
        try {
            const result = await this.client.delete(objectName);
            return result;
        } catch (error) {
            console.error('删除文件失败:', error);
            throw error;
        }
    }
}