import { calculateGanZhi } from '../utils/ganZhiCalculator';

async function testGanZhi() {
    // 测试今天
    const today = new Date();
    console.log('今天日期:', `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`);
    const todayResult = await calculateGanZhi(
        today.getFullYear(),
        today.getMonth() + 1,
        today.getDate()
    );
    console.log('今天的结果:', todayResult);

    // 测试明天
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    console.log('\n明天日期:', `${tomorrow.getFullYear()}-${tomorrow.getMonth() + 1}-${tomorrow.getDate()}`);
    const tomorrowResult = await calculateGanZhi(
        tomorrow.getFullYear(),
        tomorrow.getMonth() + 1,
        tomorrow.getDate()
    );
    console.log('明天的结果:', tomorrowResult);

    // 测试昨天
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    console.log('\n昨天日期:', `${yesterday.getFullYear()}-${yesterday.getMonth() + 1}-${yesterday.getDate()}`);
    const yesterdayResult = await calculateGanZhi(
        yesterday.getFullYear(),
        yesterday.getMonth() + 1,
        yesterday.getDate()
    );
    console.log('昨天的结果:', yesterdayResult);
}

// 运行测试
testGanZhi().catch(console.error);