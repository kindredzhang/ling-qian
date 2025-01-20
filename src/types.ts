// 五行元素类型
export type Element = '金' | '木' | '水' | '火' | '土';

// 干支计算结果
export interface GanZhiResult {
  ganZhi: string;
  element: Element;
  elementFileUrl: string;
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

// ... 其他类型定义保持不变 ... 