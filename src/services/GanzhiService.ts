import { Solar } from 'lunar-typescript';
import { BirthInfo, FinalResult, GanZhiResult, MissingElement, ProductResult } from "../types";
import {  getFileUrlByElement } from "../utils/GanZhiCalculator";
import { getMissingElement } from '../utils/MissingCalculator';
import {getLuckyInfo} from '../utils/LuckyCaculator';
import { getMissingDescription, getMissingAdvice, getElementDescription, getElementRecentLuck, getProducts } from '../config/elementDescriptions';

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
        const lunar = await Solar.fromYmd(birthInfo.year, birthInfo.month, birthInfo.day).getLunar(); 
        const element :string = getMissingElement(lunar.getBaZi());
        return {
            element: element,
            description: getMissingDescription(element),
            advice: getMissingAdvice(element)
        };
    }

}