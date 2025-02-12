// 五行元素类型
export type Element = '金' | '木' | '水' | '火' | '土';

// 干支计算结果
export interface GanZhiResult {
  ganZhi: string;
  element: string;
  elementFileUrl: string;
  description: string; // 特质  
  recentLuck: string; // 最近幸运,
  yi: string[],
  ji: string[],
  luckySymbols: {
    color: string;
    direction: string;
    object: string;
  }
}

export interface MissingElement {
  element: string;
  description: string; // 特质
  advice: string; // 健康建议
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
  productResult: ProductResult[]; // 推荐产品
}