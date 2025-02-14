import { Solar } from 'lunar-typescript';
import { getElementDescription, getElementRecentLuck, getMissingAdvice, getMissingDescription, getProducts } from '../config/elementDescriptions';
import { BirthInfo, FinalResult, GanZhiResult, MissingElement } from "../types";
import { getFileUrlByElement } from "../utils/GanZhiCalculator";
import { getLuckyInfo } from '../utils/LuckyCaculator';
import { getMissingElement } from '../utils/MissingCalculator';

export default class GanzhiService {

    static async calculate(birthInfo: BirthInfo) :Promise<FinalResult> {
        const ganZhiResult = await this.getGanzhiResult(birthInfo);
        const missingElement = await this.getMissingElement(birthInfo);
        const luckySymbol = getLuckyInfo(birthInfo);
        const productList = await getProducts(ganZhiResult.element);
        return {
            ganZhiResult: ganZhiResult,
            missingElement: missingElement,
            luckySymbol: luckySymbol,
            productList: productList
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
        };
    }

    // 计算缺失五行
    static async getMissingElement(birthInfo: BirthInfo): Promise<MissingElement> {
        try {
            const bazi = Solar.fromYmd(birthInfo.year, birthInfo.month, birthInfo.day).getLunar().getBaZi();
            const element = getMissingElement(bazi);
            return {
                element: element,
                description: getMissingDescription(element),
                advice: getMissingAdvice(element)
            };
        } catch (error) {
            console.error('Error calculating missing element:', error);
            throw error;
        }
    }

}