<template>
  <div>
    <!-- 1.容器 -->
    <!-- <div id="main"></div> -->
    <div id="container" style="width: 600px;height:400px;margin:20px auto;"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import Highcharts from 'highcharts/highstock';
export default {
  mounted(){
    var Highcharts = require('highcharts');

    // 在 Highcharts 加载之后加载功能模块
    require('highcharts/modules/exporting')(Highcharts);
     // 图表配置
        var options = {
            chart: {
                type: 'bar'                          //指定图表的类型，默认是折线图（line）
            },
            title: {
                text: '我的第一个图表'                 // 标题
            },
            xAxis: {
                categories: ['苹果', '香蕉', '橙子']   // x 轴分类
            },
            yAxis: {
                title: {
                    text: '吃水果个数'                // y 轴标题
                }
            },
            series: [{                              // 数据列
                name: '小明',                        // 数据列名
                data: [1, 0, 4]                     // 数据
            }, {
                name: '小红',
                data: [5, 7, 3]
            }]
        };
        // 图表初始化函数
        var chart = Highcharts.chart('container', options);



      // echarts用法
      // // 基于准备好的dom，初始化echarts实例
      //   var myChart = echarts.init(document.getElementById('main'),'light');

      //   // 指定图表的配置项和数据
      //   var option = {
      //       title: {
      //           text: '产品月销量'
      //       },
      //       tooltip: {},
      //       legend: {
      //           data:['销量']
      //       },
      //       xAxis: {
      //           data: ["电器","服装","厨具","家具","零食","电子"]
      //       },
      //       yAxis: {},
      //       series: [{
      //           name: '销量',
      //           type: 'line',
      //           data: [200, 20000, 203, 230, 50000, 3000]
      //       }]
      //   };

      //   // 使用刚指定的配置项和数据显示图表。
      //   myChart.setOption(option);
  }
}
</script>

<style scoped>
#main{
  width:600px;
  height: 400px;
  margin:20px auto;
}
</style>
