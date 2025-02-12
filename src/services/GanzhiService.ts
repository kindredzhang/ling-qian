import { BirthInfo, ProductResult, FinalResult, Element } from "../types";
import { OssService } from "../utils/OssService";
export default class GanzhiService {
    
    static async calculate(birthInfo: BirthInfo) :Promise<FinalResult> {
        return {
            ganZhiResult: {
                ganZhi: '',
                element: '金',
                elementFileUrl: '',
                description: '',
                recentLuck: '',
                luckySymbols: {
                    color: '',
                    direction: '',
                    object: ''
                }
            },
            missingElements: [],
            productResult: []
        };
    }

    // 计算产品
    static async getProductsByElement(element: Element): Promise<ProductResult> {
        let productTitle = '';
        let productFileUrl = '';
        let productDescription = '';
        const ossService = new OssService();
      
        switch (element) {
          case '金':
            productTitle = '清晨朝露';
            productFileUrl = await ossService.getFileUrl(`image/products/jin.jpg`);
            productDescription = '晨光熹微，朝露未晞';
            break;
          case '木':
            productTitle = '青竹雅集';
            productFileUrl = await ossService.getFileUrl(`image/products/mu.jpg`);
            productDescription = '竹影横斜水清浅，小径通幽处';
            break;
          case '水':
            productTitle  = '溪山云远';
            productFileUrl = await ossService.getFileUrl(`image/products/shui.jpg`);
            productDescription = '溪云初起日沉阁，山雨欲来风满楼';
            break;
          case '火':
            productTitle = '丹炉映月';
            productFileUrl = await ossService.getFileUrl(`image/products/huo.jpg`);
            productDescription = '丹炉初温沐浴，明月共品茶';
            break;
          case '土':
            productTitle = '玉台清供';
            productFileUrl = await ossService.getFileUrl(`image/products/tu.jpg`);
            productDescription = '玉盘珍馐今具备，清风明月我相伴';
            break;
        }
        return { productTitle, productFileUrl, productDescription };
      }

}