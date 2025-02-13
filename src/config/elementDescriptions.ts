import { ProductResult } from "../types";
import { OssService } from "../utils/OssService";

interface ElementDescriptions {
    description: string[];
    recentLuck: string[];
    missingDescription: string[];
    missingAdvice: string[];
    products: ProductResult[];
}

export const elementDescriptions: Record<string, ElementDescriptions> = {
    '木': {
        description: [
            '木代表生长、向上、希望',
            '木象征着春天、生机、活力',
            '木性温和，富有同情心和创造力'
        ],
        recentLuck: [
            '近期运势上升，适合开始新的计划',
            '贵人运旺盛，多与人交流会有意外收获',
            '创业机会良多，把握时机可获得成功'
        ],
        missingDescription: [
            '缺木意味着缺乏成长性和创造力',
            '需要加强耐心和毅力的培养',
            '可能在决策方面较为犹豫'
        ],
        missingAdvice: [
            '建议多接触大自然，增加绿色植物',
            '可以尝试新的学习和探索',
            '培养创造性思维和决断力'
        ],
        products: [
            {
                productTitle: '青竹雅集',
                productFileUrl: 'image/products/mu.jpg',
                productDescription: '竹影横斜水清浅，小径通幽处'
            },
        ]
    },
    '火': {
        description: [
            '火代表热情、动力、光明',
            '火象征着夏天、温暖、活力',
            '火性急进，充满激情和创造力'
        ],
        recentLuck: [
            '事业运势正旺，适合大胆进取',
            '人际关系活跃，社交圈将扩大',
            '创新项目有望取得突破'
        ],
        missingDescription: [
            '缺火暗示缺乏激情和动力',
            '可能在社交方面较为被动',
            '事业发展需要更多主动性'
        ],
        missingAdvice: [
            '建议多参加群体活动，增加社交',
            '可以尝试充满挑战的新事物',
            '培养积极乐观的生活态度'
        ],
        products: [
            {
                productTitle: '丹炉映月',
                productFileUrl: 'image/products/huo.jpg',
                productDescription: '丹炉初温沐浴，明月共品茶'
            },
        ]
    },
    '土': {
        description: [
            '土代表稳重、踏实、包容',
            '土象征着收获、安定、中和',
            '土性温厚，重视实际和务实'
        ],
        recentLuck: [
            '财运稳定，适合稳健投资',
            '人缘运佳，易得长辈提携',
            '适合处理需要耐心的事务'
        ],
        missingDescription: [
            '缺土表示缺乏稳定性和踏实感',
            '可能在规划方面较为松散',
            '需要加强责任心的培养'
        ],
        missingAdvice: [
            '建议制定详细的计划并执行',
            '培养稳重踏实的处事态度',
            '加强自我约束和时间管理'
        ],
        products: [
            {
                productTitle: '玉台清供',
                productFileUrl: 'image/products/tu.jpg',
                productDescription: '玉盘珍馐今具备，清风明月我相伴'
            },
        ]
    },
    '金': {
        description: [
            '金代表坚强、果断、威严',
            '金象征着秋天、收敛、正气',
            '金性刚毅，注重效率和规范'
        ],
        recentLuck: [
            '财运亨通，适合把握机会',
            '贵人相助，事业有新突破',
            '适合处理需要决断的事务'
        ],
        missingDescription: [
            '缺金意味着缺乏果断和执行力',
            '可能在自律方面较为松散',
            '需要加强意志力的培养'
        ],
        missingAdvice: [
            '建议培养规律的生活习惯',
            '加强自我约束和纪律性',
            '提升工作效率和执行力'
        ],
        products: [
            {
                productTitle: '清晨朝露',
                productFileUrl: 'image/products/jin.jpg',
                productDescription: '晨光熹微，朝露未晞'
            },
        ]
    },
    '水': {
        description: [
            '水代表智慧、灵活、包容',
            '水象征着冬天、沉静、睿智',
            '水性柔和，富有智慧和适应力'
        ],
        recentLuck: [
            '学习运势良好，适合进修深造',
            '人际关系融洽，沟通顺畅',
            '适合规划长远发展计划'
        ],
        missingDescription: [
            '缺水表示缺乏灵活性和智慧',
            '可能在应变方面较为僵化',
            '需要加强学习能力的培养'
        ],
        missingAdvice: [
            '建议多读书学习，增长见识',
            '培养灵活变通的处事方式',
            '提升沟通和表达能力'
        ],
        products: [
            {
                productTitle: '溪山云远',
                productFileUrl: 'image/products/shui.jpg',
                productDescription: '溪云初起日沉阁，山雨欲来风满楼'
            },
        ]
    }
};

export function getElementDescription(element: string): string {
    const descriptions = elementDescriptions[element]?.description || elementDescriptions['木'].description;
    return descriptions[Math.floor(Math.random() * descriptions.length)];
}

export function getElementRecentLuck(element: string): string {
    const lucks = elementDescriptions[element]?.recentLuck || elementDescriptions['木'].recentLuck;
    return lucks[Math.floor(Math.random() * lucks.length)];
}

export function getMissingDescription(element: string): string {
    const descriptions = elementDescriptions[element]?.missingDescription || elementDescriptions['木'].missingDescription;
    return descriptions[Math.floor(Math.random() * descriptions.length)];
}

export function getMissingAdvice(element: string): string {
    const advice = elementDescriptions[element]?.missingAdvice || elementDescriptions['木'].missingAdvice;
    return advice[Math.floor(Math.random() * advice.length)];
}

export async function getProducts(element: string): Promise<ProductResult[]> {
    const products = elementDescriptions[element]?.products || elementDescriptions['木'].products;
    const ossService = new OssService();
    return Promise.all(products.map(async p => ({
        ...p,
        productFileUrl: await ossService.getFileUrl(p.productFileUrl)
    })));
}