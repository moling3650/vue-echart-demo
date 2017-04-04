<template>
  <div class="demo">
    <div class="bar" ref="bar" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
  export default {
    name: 'Demo',
    data () {
      return {
        myChart: null
      }
    },
    mounted () {
      this.myChart = this.echarts.init(this.$refs.bar)
      let option = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      }
      this.myChart.setOption(option)
    }
  }
</script>

<style lang="css" scoped>
</style>
