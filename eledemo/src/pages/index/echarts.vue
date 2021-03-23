<template>
  <div id="main"></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    mounted(){
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: '月销量展示'
            },
            tooltip: {},
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子','电子','家具']
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'line',
                data: [5, 20, 36, 10, 10, 20,40,10]
            }]
        });
    }
}
</script>

<style scoped>
    #main{
        width: 700px;
        height: 500px;
        margin: 0 auto;
    }
</style>