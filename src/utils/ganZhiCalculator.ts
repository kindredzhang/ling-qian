import { GanZhiResult, Element } from "../types";

const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

const ELEMENT_MAPPING = {
  '海中金': '金' as Element,
  '炉中火': '火' as Element,
  '大林木': '木' as Element,
  '路旁土': '土' as Element,
  '剑锋金': '金' as Element,
  '山头火': '火' as Element,
  '涧下水': '水' as Element,
  '城头土': '土' as Element,
  '白蜡金': '金' as Element,
  '杨柳木': '木' as Element,
  '泉中水': '水' as Element,
  '屋上土': '土' as Element,
  '霹雳火': '火' as Element,
  '松柏木': '木' as Element,
  '长流水': '水' as Element,
  '沙中金': '金' as Element,
  '山下火': '火' as Element,
  '平地木': '木' as Element,
  '壁上土': '土' as Element,
  '金箔金': '金' as Element,
  '覆灯火': '火' as Element,
  '天河水': '水' as Element,
  '大驿土': '土' as Element,
  '钗钏金': '金' as Element,
  '桑柘木': '木' as Element,
  '大溪水': '水' as Element,
  '沙中土': '土' as Element,
  '天上火': '火' as Element,
  '石榴木': '木' as Element,
  '大海水': '水' as Element
};

const GANZHI_ELEMENT_MAP = new Map([
  ['甲子乙丑', '海中金'], ['丙寅丁卯', '炉中火'], ['戊辰己巳', '大林木'],
  ['庚午辛未', '路旁土'], ['壬申癸酉', '剑锋金'], ['甲戌乙亥', '山头火'],
  ['丙子丁丑', '涧下水'], ['戊寅己卯', '城头土'], ['庚辰辛巳', '白蜡金'],
  ['壬午癸未', '杨柳木'], ['甲申乙酉', '泉中水'], ['丙戌丁亥', '屋上土'],
  ['戊子己丑', '霹雳火'], ['庚寅辛卯', '松柏木'], ['壬辰癸巳', '长流水'],
  ['甲午乙未', '沙中金'], ['丙申丁酉', '山下火'], ['戊戌己亥', '平地木'],
  ['庚子辛丑', '壁上土'], ['壬寅癸卯', '金箔金'], ['甲辰乙巳', '覆灯火'],
  ['丙午丁未', '天河水'], ['戊申己酉', '大驿土'], ['庚戌辛亥', '钗钏金'],
  ['壬子癸丑', '桑柘木'], ['甲寅乙卯', '大溪水'], ['丙辰丁巳', '沙中土'],
  ['戊午己未', '天上火'], ['庚申辛酉', '石榴木'], ['壬戌癸亥', '大海水']
]);

export function calculateGanZhi(year: number): GanZhiResult {
  // 计算天干
  const heavenlyStemIndex = (year - 4) % 10;
  const heavenlyStem = HEAVENLY_STEMS[heavenlyStemIndex];
  
  // 计算地支
  const earthlyBranchIndex = (year - 4) % 12;
  const earthlyBranch = EARTHLY_BRANCHES[earthlyBranchIndex];
  
  const ganZhi = heavenlyStem + earthlyBranch;
  // 查找对应的五行属性
  let element: Element = '金';
  for (const [key, value] of GANZHI_ELEMENT_MAP.entries()) {
    if (key.includes(ganZhi)) {
      element = ELEMENT_MAPPING[value as keyof typeof ELEMENT_MAPPING];
      break;
    }
  }
  
  return { ganZhi, element };
}