type Element = '金' | '木' | '水' | '火' | '土';
type HeavenlyStem = '甲' | '乙' | '丙' | '丁' | '戊' | '己' | '庚' | '辛' | '壬' | '癸';
type EarthlyBranch = '子' | '丑' | '寅' | '卯' | '辰' | '巳' | '午' | '未' | '申' | '酉' | '戌' | '亥';

// 天干对应五行
const heavenlyStemsMap: Record<HeavenlyStem, Element> = {
  '甲': '木', '乙': '木',
  '丙': '火', '丁': '火',
  '戊': '土', '己': '土',
  '庚': '金', '辛': '金',
  '壬': '水', '癸': '水'
};

// 地支藏干（主气、中气、余气）
const earthlyBranchesMap: Record<EarthlyBranch, HeavenlyStem[]> = {
  '子': ['癸'],
  '丑': ['己', '癸', '辛'],
  '寅': ['甲', '丙', '戊'],
  '卯': ['乙'],
  '辰': ['戊', '乙', '癸'],
  '巳': ['丙', '戊', '庚'],
  '午': ['丁', '己'],
  '未': ['己', '丁', '乙'],
  '申': ['庚', '壬', '戊'],
  '酉': ['辛'],
  '戌': ['戊', '辛', '丁'],
  '亥': ['壬', '甲']
};

export function getMissingElement(bazi: string[]): string {
  if (!Array.isArray(bazi)) {
    throw new Error('BaZi must be an array');
  }

  if (bazi.length !== 4) {
    throw new Error(`BaZi array must have exactly 4 elements, got ${bazi.length}`);
  }
  // 初始化五行计数器
  const elementsCount: Record<Element, number> = { 金: 0, 木: 0, 水: 0, 火: 0, 土: 0 };

  // 拆分四柱
  const [year, month, day, hour] = bazi.map(p => ({
    gan: p[0] as HeavenlyStem,
    zhi: p[1] as EarthlyBranch
  }));

  // 统计天干五行
  [year.gan, month.gan, day.gan, hour.gan].forEach(gan => {
    if (heavenlyStemsMap[gan]) {
      elementsCount[heavenlyStemsMap[gan]]++;
    }
  });

  // 统计地支藏干五行
  [year.zhi, month.zhi, day.zhi, hour.zhi].forEach(zhi => {
    if (earthlyBranchesMap[zhi]) {
      earthlyBranchesMap[zhi].forEach(hiddenGan => {
        if (heavenlyStemsMap[hiddenGan]) {
          elementsCount[heavenlyStemsMap[hiddenGan]]++;
        }
      });
    }
  });

  // 找出缺失元素（数量为零）
  const missingElements = Object.entries(elementsCount)
    .filter(([_, count]) => count === 0)
    .map(([element]) => element as Element);

  if (missingElements.length > 0) return missingElements[0];

  // 若无缺失则返回最弱元素（数量最少）
  const minCount = Math.min(...Object.values(elementsCount));
  return Object.entries(elementsCount)
    .filter(([_, count]) => count === minCount)
    .map(([element]) => element as Element)[0];
}