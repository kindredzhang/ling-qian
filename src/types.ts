// 五行元素类型
export type Element = '金' | '木' | '水' | '火' | '土';

// 干支计算结果
export interface GanZhiResult {
  ganZhi: string;
  element: Element;
  elementFileUrl: string;
  description: string; // 特质  
  recentLuck: string; // 最近幸运
  luckySymbols: {
    color: string;
    direction: string;
    object: string;
  }
}

export interface MissingElements {
  element: Element;
  description: string; // 特质
  advice: string; // 健康建议
  mantra: string;
  activitySuggestions: string[];
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
  missingElements: MissingElements[]; // 缺陷元素
  productResult: ProductResult[]; // 推荐产品
}