import { Element, GanZhiResult, ProductResult } from "../types";
import { OssService } from "./OssService";

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

// 新增一个获取随机五行的函数
function getRandomElement(excludeElement?: Element): Element {
  const elements: Element[] = ['金', '木', '水', '火', '土'];
  if (excludeElement) {
    const filteredElements = elements.filter(e => e !== excludeElement);
    return filteredElements[Math.floor(Math.random() * filteredElements.length)];
  }
  return elements[Math.floor(Math.random() * elements.length)];
}

// 新增一个生成用户每日key的函数
function generateDailyKey(userName: string, date: Date): string {
  const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  return `${userName}_${dateStr}`;
}

// 用于存储用户前一天的结果
const userPreviousResults = new Map<string, Element>();

export async function calculateGanZhi(
  birthYear: number, 
  birthMonth: number, 
  birthDay: number,
  userName: string
): Promise<GanZhiResult> {
  // 获取当前日期
  const currentDate = new Date();
  const yesterday = new Date(currentDate);
  yesterday.setDate(yesterday.getDate() - 1);
  
  // 计算基础数值
  const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
  const base = new Date(1900, 0, 31);
  
  // 结合出生日期和当前日期进行计算
  const birthDiff = Math.floor((birthDate.getTime() - base.getTime()) / (24 * 60 * 60 * 1000));
  const currentDiff = Math.floor((currentDate.getTime() - base.getTime()) / (24 * 60 * 60 * 1000));
  
  // 使用出生差值、当前差值和时间戳的组合来计算最终的索引
  const timeBasedValue = currentDate.getTime() % (24 * 60 * 60 * 1000); // 当天的毫秒数
  const combinedIndex = (birthDiff + currentDiff + Math.floor(timeBasedValue / 1000)) % 30;
  
  // 计算天干地支
  const heavenlyStemIndex = (combinedIndex + 4) % 10;
  const earthlyBranchIndex = (combinedIndex + 2) % 12;
  
  const heavenlyStem = HEAVENLY_STEMS[heavenlyStemIndex];
  const earthlyBranch = EARTHLY_BRANCHES[earthlyBranchIndex];
  const ganZhi = heavenlyStem + earthlyBranch;
  
  // 获取基础五行属性
  let element: Element = '金';
  for (const [key, value] of GANZHI_ELEMENT_MAP.entries()) {
    if (key.includes(ganZhi)) {
      element = ELEMENT_MAPPING[value as keyof typeof ELEMENT_MAPPING];
      break;
    }
  }
  
  // 检查昨天的结果
  const yesterdayKey = generateDailyKey(userName, yesterday);
  const previousElement = userPreviousResults.get(yesterdayKey);
  
  // 如果与昨天结果相同，随机选择一个不同的五行
  if (previousElement === element) {
    const elements: Element[] = ['金', '木', '水', '火', '土'];
    const availableElements = elements.filter(e => e !== previousElement);
    element = availableElements[Math.floor(Math.random() * availableElements.length)];
  }
  
  // 存储今天的结果
  const todayKey = generateDailyKey(userName, currentDate);
  userPreviousResults.set(todayKey, element);
  
  // 清理过期数据（保留最近7天的数据）
  const DAYS_TO_KEEP = 7;
  const cleanupDate = new Date(currentDate);
  cleanupDate.setDate(cleanupDate.getDate() - DAYS_TO_KEEP);
  for (const [key] of userPreviousResults) {
    const [userId, dateStr] = key.split('_');
    const keyDate = new Date(dateStr);
    if (keyDate < cleanupDate) {
      userPreviousResults.delete(key);
    }
  }

  // 获取元素图片
  const ossService = new OssService();
  const letter = element === '金' ? 'jin' 
               : element === '木' ? 'mu'
               : element === '水' ? 'shui'
               : element === '火' ? 'huo'
               : 'tu';
  const elementFileUrl = await ossService.getFileUrl(`image/elements/${letter}.jpg`);
  
  return { ganZhi, element, elementFileUrl };
}