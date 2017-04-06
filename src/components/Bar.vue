<template>
  <div class="bar">
    <div class="bar" ref="bar" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
  export default {
    name: 'bar',
    data () {
      return {
        myChart: null
      }
    },
    mounted () {
      this.myChart = this.echarts.init(this.$refs.bar)
      let option = {
        title: {
          text: '不良现象分布',
          left: 'center'
        },
        tooltip: {},
        legend: {
          data: ['数量'],
          right: 0,
          top: 'middle'
        },
        xAxis: {
          data: ['外观不良', '褶皱', '毛刺']
        },
        yAxis: {
        },
        color: ['#418ebd'],
        series: [{
          name: '数量',
          type: 'bar',
          data: [2, 2, 5],
          barMaxWidth: 50,
          label: {
            normal: {
              show: true,
              position: 'top',
              textStyle: {
                fontSize: 16
              }
            }
          }
        }]
      }
      this.myChart.setOption(option)
    }
  }
</script>

<style lang="css" scoped>
</style>
