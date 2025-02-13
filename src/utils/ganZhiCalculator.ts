import { OssService } from "./OssService";

export async function getFileUrlByElement(element: string) {
  // 获取元素图片
  const ossService = new OssService();
  const letter = element === '金' ? 'jin'
    : element === '木' ? 'mu'
      : element === '水' ? 'shui'
        : element === '火' ? 'huo'
          : 'tu';
  const elementFileUrl = await ossService.getFileUrl(`image/elements/${letter}.jpg`);

  return elementFileUrl;
}
