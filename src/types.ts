// 干支计算结果
export interface GanZhiResult {
  ganZhi: string;
  element: string;
  elementFileUrl: string;
  description: string; // 特质  
  recentLuck: string; // 最近幸运,
  yi: string[],
  ji: string[]
}

export interface MissingElement {
  element: string;
  description: string; // 特质
  advice: string; // 健康建议
}

export interface LuckySymbol {
  color: string;
  direction: string;
  number: string;
}

// 产品推荐结果
export interface ProductResult {
  productTitle: string;
  productFileUrl: string;
  productDescription: string;
}

// 用户生日信息
export interface BirthInfo {
  year: number;
  month: number;
  day: number;
  name: string;
}

export interface FinalResult {
  ganZhiResult: GanZhiResult; // 计算结果
  missingElement: MissingElement; // 缺陷元素
  luckySymbol: LuckySymbol; // 幸运符号
  productList: ProductResult[]; // 推荐产品
}

export const tianGan: { [key: string]: string } = {
  '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土', '己': '土', '庚': '金', '辛': '金', '壬': '水', '癸': '水',
};

export const diZhi: { [key: string]: string } = {
  '子': '水', '丑': '土', '寅': '木', '卯': '木', '辰': '土', '巳': '火', '午': '火', '未': '土', '申': '金', '酉': '金', '戌': '土', '亥': '水',
};