import { BirthInfo, Element } from "../types";

export async function getMissingElement(birthInfo: BirthInfo, dailyElement: Element): Promise<Element> {
    const currentDate = new Date();
    const birthDate = new Date(birthInfo.year, birthInfo.month - 1, birthInfo.day);
    const baseDate = new Date(1900, 0, 31);

    const birthDiff = Math.floor((birthDate.getTime() - baseDate.getTime()) / (24 * 60 * 60 * 1000));
    const currentDiff = Math.floor((currentDate.getTime() - baseDate.getTime()) / (24 * 60 * 60 * 1000));

    const combinedIndex = (birthDiff + currentDiff) % 5; // 5 elements: 金, 木, 水, 火, 土
    const elements = ['金', '木', '水', '火', '土'];
    
    let missingElement = elements[(combinedIndex + 5 - elements.indexOf(dailyElement)) % 5];

    // Ensure missingElement is not the same as dailyElement
    const otherElements = elements.filter(element => element !== dailyElement);
    missingElement = otherElements[Math.floor(Math.random() * otherElements.length)];
    
    return missingElement as Element;
}


export function getMissingDescription(missingElement: string): string {
    switch (missingElement) {
        case '金':
            return [
                '金的特质是坚毅果断，耐得住岁月的磨砺。',
                '金象征着力量和财富，具有良好的决策能力。'
            ][Math.floor(Math.random() * 2)];
        case '木':
            return [
                '木代表着生机勃勃，充满希望与生长的力量。',
                '木象征着灵魂的成长与坚韧，适合创造性工作。'
            ][Math.floor(Math.random() * 2)];
        case '水':
            return [
                '水象征着智慧灵活，能在变幻莫测的局面中找到适应之道。',
                '水带来流动与变化，适合做出灵活的决策。'
            ][Math.floor(Math.random() * 2)];
        case '火':
            return [
                '火热情奔放，代表着创造与冲破束缚的勇气。',
                '火象征着激情与动力，能够激励他人。'
            ][Math.floor(Math.random() * 2)];
        case '土':
            return [
                '土稳重踏实，包容万象，耐得住岁月的变迁。',
                '土象征着稳定与支持，是坚实的基础。'
            ][Math.floor(Math.random() * 2)];
        default:
            return '';
    }
}

export function getMissingAdvice(missingElement: string): string {
    switch (String(missingElement)) {
        case '金':
            return [
                '保持冷静，控制情绪，避免冲动消费。',
                '注意投资理财，谨防损失。'
            ][Math.floor(Math.random() * 2)];
        case '木':
            return [
                '注意休息，别过度劳累，保持身心平衡。',
                '关注身体健康，适度锻炼。'
            ][Math.floor(Math.random() * 2)];
        case '水':
            return [
                '保持思维的灵活性，勇于尝试新事物。',
                '多与人交流，分享想法。'
            ][Math.floor(Math.random() * 2)];
        case '火':
            return [
                '注意沟通方式，避免不必要的冲突。',
                '保持冷静，处理人际关系中的矛盾。'
            ][Math.floor(Math.random() * 2)];
        case '土':
            return [
                '稳步前行，关注家庭和事业的基础建设。',
                '保持耐心，不急功近利。'
            ][Math.floor(Math.random() * 2)];
        default:
            return '';
    }
}