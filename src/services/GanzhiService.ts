import { Solar } from 'lunar-typescript';
import { BirthInfo, Element, FinalResult, GanZhiResult, MissingElement, ProductResult } from "../types";
import { getElementByGanzhi, getElementDescription, getElementLuckySymbols, getElementRecentLuck, getFileUrlByElement } from "../utils/GanZhiCalculator";
import { getMissingAdvice, getMissingDescription, getMissingElement } from '../utils/MissingCalculator';
import { OssService } from "../utils/OssService";

export default class GanzhiService {
    
    static async calculate(birthInfo: BirthInfo) :Promise<FinalResult> {
        const ganZhiResult = await this.getGanzhiResult(birthInfo);
        const missingElement = await this.getMissingElement(birthInfo);
        const productResult = await this.getProducts(ganZhiResult.element);
        return {
            ganZhiResult: ganZhiResult,
            missingElement: missingElement,
            productResult: productResult
        }
    }

    // 计算五行
    static async getGanzhiResult(birthInfo: BirthInfo): Promise<GanZhiResult> {
        // 取nayin "壁上土"
        const lunar = await Solar.fromYmd(birthInfo.year, birthInfo.month, birthInfo.day).getLunar(); 
        const ganZhi = lunar.getTimeNaYin();
        // 取最后一个字 "土"
        const element = ganZhi != null ? ganZhi.slice(-1) : '土';
        const elementFileUrl = await getFileUrlByElement(element);

        return {
            ganZhi: ganZhi,
            element: element,
            elementFileUrl: elementFileUrl,
            yi: lunar.getTimeYi(),
            ji: lunar.getTimeJi(),
            description: getElementDescription(element),
            recentLuck: getElementRecentLuck(element),
            luckySymbols: getElementLuckySymbols(lunar)
        };
    }

    // 计算缺失五行
    static async getMissingElement(birthInfo: BirthInfo): Promise<MissingElement> {
        const lunar = await Solar.fromYmd(birthInfo.year, birthInfo.month, birthInfo.day).getLunar(); 
        const ganZhi = lunar.getTimeNaYin();
        const element = ganZhi != null ? ganZhi.slice(-1) : '土';
        let missingElement;
        if (element === '金') {
            missingElement = '水';
        } else if (element === '木') {
            missingElement = '火';
        } else if (element === '水') {
            missingElement = '木';
        } else if (element === '火') {
            missingElement = '土';
        } else {
            missingElement = '金';
        }

        return {
            element: missingElement,
            description: getMissingDescription(missingElement),
            advice: getMissingAdvice(missingElement)
        };
    }

    // 计算产品
    static async getProducts(element: string): Promise<ProductResult[]> {
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
        return [
            {
                productTitle: productTitle,
                productDescription: productDescription,
                productFileUrl: productFileUrl
            }
        ];
      }

}