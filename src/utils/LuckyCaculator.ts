import { Solar } from "lunar-typescript";
import { BirthInfo, LuckySymbol } from "../types";

export function getLuckyInfo(birthInfo :BirthInfo): LuckySymbol {
    const lunar = Solar.fromYmd(birthInfo.year, birthInfo.month, birthInfo.day).getLunar(); 
    const baZi = lunar.getBaZi();
    const missingElement = '11';

    return {
      color: getLuckyColor(missingElement),
      direction: lunar.getTimePositionXiDesc(),
      number: getLuckyNumber(missingElement)
    };
}

const luckyColors: { [key: string]: string[] } = {
    '木': ['绿色', '青色'],
    '火': ['红色', '紫色'],
    '土': ['黄色', '棕色'],
    '金': ['白色', '金色', '银色'],
    '水': ['黑色', '蓝色'],
};

function getLuckyColor(missingElement: string): string {
  const colors = luckyColors[missingElement] || luckyColors['木'];
  return colors[Math.floor(Math.random() * colors.length)];
}

// 五行与幸运数字的关系
const luckyNumbers: { [key: string]: number[] } = {
  '木': [1, 3, 4],
  '火': [2, 9],
  '土': [5, 10],
  '金': [6, 7],
  '水': [8],
};

function getLuckyNumber(missingElement: string): string {
  const numbers = luckyNumbers[missingElement] || luckyNumbers['木'];
  return numbers[Math.floor(Math.random() * numbers.length)].toString();
}
