<template>
  <div class="e-line" ref="e-line" :style="{width, height}"></div>
</template>

<script>
  export default {
    name: 'ELine',
    props: {
      width: {
        type: [Number, String],
        default: '100%'
      },
      height: {
        type: [Number, String],
        default: '200%'
      }
    },
    data () {
      return {
        myChart: null
      }
    },
    mounted () {
      this.myChart = this.echarts.init(this.$refs['e-line'])

      let option = {
        title: {
          text: '车间不良推移',
          left: 'center'
        },
        tooltip: {},
        legend: {
          data: ['不良数'],
          right: 0,
          top: 'middle'
        },
        grid: {
          right: 80
        },
        xAxis: {
          data: [8, 9, 10, 11, 12, 13],
          axisLabel: {
            formatter: '{value}点'
          }
        },
        yAxis: {
          interval: 1
        },
        color: ['#418ebd'],
        series: [{
          name: '不良数',
          type: 'line',
          data: [2, 1, 2, 3, 0, 1]
        }]
      }
      this.myChart.setOption(option)
    }
  }
</script>

<style lang="css" scoped>
</style>
