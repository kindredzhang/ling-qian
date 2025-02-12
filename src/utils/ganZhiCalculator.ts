import { Lunar, Solar } from "lunar-typescript";
import { OssService } from "./OssService";
enum LuckyColor {
  White = '白色',
  Green = '绿色',
  Black = '黑色',
  Red = '红色',
  Yellow = '黄色'
}

enum LuckyDirection {
  West = '西方',
  East = '东方',
  North = '北方',
  South = '南方',
  Center = '中央'
}

enum LuckyObject {
  JadeBracelet = '白玉手链',
  EmeraldBracelet = '翡翠手串',
  ObsidianBracelet = '黑曜石手链',
  SandalwoodBracelet = '檀木手串',
  CitrineBracelet = '黄水晶手链'
}

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

export async function getElementByGanzhi(ganZhi: string): Promise<string> {
  // 获取基础五行属性
  let element: string = '金';
  for (const [key, value] of GANZHI_ELEMENT_MAP.entries()) {
    if (key.includes(ganZhi)) {
      element = value;
      break;
    }
  }
  return element;
}

export async function getFileUrlByElement(element: string) {
  // 获取元素图片
  const ossService = new OssService();
  const letter = element === '金' ? 'jin'
    : element === '木' ? 'mu'
      : element === '水' ? 'shui'
        : element === '火' ? 'huo'
          : 'tu';
  const elementFileUrl = await ossService.getFileUrl(`image/elements/${letter}.jpg`);

  return elementFileUrl;
}

export function getElementDescription(element: string): string {
  switch (element) {
    case '金': 
      return '金，如同熔铸的金属，坚毅果断，耐得住岁月的磨砺。正如古训所言：“天行健，君子以自强不息”。';
    case '木':
      return '木，生机勃勃，犹如春天的森林，充满希望与生长的力量。它象征着灵魂的成长与坚韧。';
    case '水':
      return '水，智慧灵活，如同清泉流淌，沉静而深远，能在变幻莫测的局面中找到适应之道。';
    case '火':
      return '火，热情奔放，如同熊熊烈焰，直冲云霄。它代表着创造与冲破束缚的勇气。';
    case '土':
      return '土，稳重踏实，广纳万物，如同大地一样厚重稳固，包容万象，耐得住岁月的变迁。';
  }
  return '土，稳重踏实，广纳万物，如同大地一样厚重稳固，包容万象，耐得住岁月的变迁。';
}

export function getElementRecentLuck(element: string): string {
  switch (element) {
    case '金':
      return [
        '本周财运亨通，贵人相助。无论是事业还是生活，都将迎来一股强劲的支持力量。此时，正是积累财富的良机。',
        '本周事业稳步提升，财富也在不断累积。保持稳定与清醒，贵人将会引导你走向更高的高峰。',
        '本周财运明显上升，投资与决策将带来回报。此时正是安稳积累财富的好时机。'
      ][Math.floor(Math.random() * 3)];
    case '木':
      return [
        '本周事业发展迅速，贵人提携，项目进展顺利。但也需谨防过度劳累，保持身心的平衡。',
        '本周充满机会与挑战，事业蓬勃发展，但要留心管理与身体健康，避免过度投入。',
        '本周事业中将出现新的突破，贵人相助带来项目的进展。务必保持专注与清晰。'
      ][Math.floor(Math.random() * 3)];
    case '水':
      return [
        '本周智慧和学习进步的时刻。无论是知识的积累还是决策的敏锐度，都能为你带来意想不到的收获。',
        '本周是提升学习与深思熟虑的最佳时机，智慧将帮助你化解困境。',
        '本周，智慧的提升与决策的果敢让你在挑战中找到新的机遇，学习将带来意想不到的成果。'
      ][Math.floor(Math.random() * 3)];
    case '火':
      return [
        '本周事业运旺盛，但需要防范口舌是非。言辞需慎重，以免无意间引发不必要的争执。',
        '本周运势颇为旺盛，但需要特别注意与人沟通的方式，避免不必要的纷争。',
        '本周，尽管事业运势良好，但要警惕与他人间的误会与冲突，保持冷静是最重要的。'
      ][Math.floor(Math.random() * 3)];
    case '土':
      return [
        '本周稳中求进，基础牢固。无论是事业还是家庭，都是值得信赖的支持力量，但切勿急功近利，稳步前行最为妥当。',
        '本周稳步前行，生活与事业将逐渐稳定，维持现有的势头将是成功的关键。',
        '本周，将有更多机会加强自己的基础建设，无论事业还是家庭，皆需踏实前行。'
      ][Math.floor(Math.random() * 3)];
    default:
      return '';
  }
}

export function getElementLuckySymbols(lunar: Lunar): { color: string; direction: string; object: string } {
  const ganZhi = lunar.getTimeNaYin();
  const element = ganZhi != null ? ganZhi.slice(-1) : '土';
  const positionXi = lunar.getTimePositionXiDesc();
  switch (element) {
    case '金':
      return {
        color: LuckyColor.White,
        direction: positionXi,
        object: LuckyObject.JadeBracelet
      };
    case '木':
      return {
        color: LuckyColor.Green,
        direction: positionXi,
        object: LuckyObject.EmeraldBracelet
      };
    case '水':
      return {
        color: LuckyColor.Black,
        direction: positionXi,
        object: LuckyObject.ObsidianBracelet
      };
    case '火':
      return {
        color: LuckyColor.Red,
        direction: positionXi,
        object: LuckyObject.SandalwoodBracelet
      };
    case '土':
      return {
        color: LuckyColor.Yellow,
        direction: positionXi,
        object: LuckyObject.CitrineBracelet
      };
    default:
      return {
        color: '',
        direction: '',
        object: ''
      };
  }
}

