export interface BirthInfo {
  name: string;
  year: number;
  month: number;
  day: number;
}

export interface Package {
  id: number;
  name: string;
  imageUrl: string;
}

export type Element = '金' | '木' | '水' | '火' | '土';

export interface GanZhiResult {
  ganZhi: string;
  element: Element;
  elementFileUrl: string;
} 

export interface ProductResult {
  productTitle: string;
  productFileUrl: string;
  productDescription: string;
}