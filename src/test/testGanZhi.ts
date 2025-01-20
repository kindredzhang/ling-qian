import { calculateGanZhi, calculateProduct } from '../utils/ganZhiCalculator';

async function testGanZhi() {
    try {
        // 测试同一个用户连续三天的结果
        const userName = '张三';
        
        // 测试昨天
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        console.log('\n===== 测试昨天 =====');
        console.log('日期:', `${yesterday.getFullYear()}-${yesterday.getMonth() + 1}-${yesterday.getDate()}`);
        const yesterdayResult = await calculateGanZhi(
            1990, // 使用固定的出生年份进行测试
            6,
            15,
            userName
        );
        console.log('结果:', yesterdayResult);
        const yesterdayProduct = await calculateProduct(yesterdayResult.element);
        console.log('推荐:', yesterdayProduct);

        // 测试今天
        const today = new Date();
        console.log('\n===== 测试今天 =====');
        console.log('日期:', `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`);
        const todayResult = await calculateGanZhi(
            1990,
            6,
            15,
            userName
        );
        console.log('结果:', todayResult);
        const todayProduct = await calculateProduct(todayResult.element);
        console.log('推荐:', todayProduct);

        // 验证结果是否不同
        if (yesterdayResult.element === todayResult.element) {
            console.log('\n警告: 昨天和今天的结果相同，算法可能需要检查');
        } else {
            console.log('\n✓ 昨天和今天的结果不同，符合预期');
        }

        // 测试不同用户同一天的结果
        const anotherUser = '李四';
        console.log('\n===== 测试不同用户 =====');
        const anotherResult = await calculateGanZhi(
            1995,
            8,
            20,
            anotherUser
        );
        console.log(`用户 ${anotherUser} 的结果:`, anotherResult);

        // 测试边界情况
        console.log('\n===== 测试边界情况 =====');
        // 测试生日为1900年1月31日（基准日期）的情况
        const baseResult = await calculateGanZhi(1900, 1, 31, '测试用户');
        console.log('基准日期(1900-1-31)的结果:', baseResult);

    } catch (error) {
        console.error('测试过程中发生错误:', error);
    }
}

// 运行测试
console.log('开始运行干支计算测试...\n');
testGanZhi().then(() => {
    console.log('\n测试完成！');
}).catch(error => {
    console.error('测试失败:', error);
});