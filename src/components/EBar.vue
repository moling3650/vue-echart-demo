<template>
  <div class="e-bar" ref="e-bar" :style="{width, height}"></div>
</template>

<script>
  export default {
    name: 'EBar',
    props: {
      width: {
        type: [Number, String],
        default: '100%'
      },
      height: {
        type: [Number, String],
        default: '200%'
      },
      wsCode: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        myChart: null
      }
    },
    mounted () {
      this.myChart = this.echarts.init(this.$refs['e-bar'])

      let option = {
        legend: {
          orient: 'vertical',
          data: ['计划', '投产', '完成'],
          right: 20,
          top: 'middle'
        },
        grid: {
          top: 0,
          right: 100
        },
        xAxis: {
        },
        yAxis: {
          data: ['正极极片', '负极极片'],
          axisLabel: {
            rotate: 0
          }
        },
        color: ['#418ebd', '#44c57e', '#ffff68'],
        series: [{
          name: '计划',
          type: 'bar',
          barMaxWidth: 20,
          data: [1000, 1000]
        }, {
          name: '投产',
          type: 'bar',
          barMaxWidth: 20,
          data: [990, 970]
        }, {
          name: '完成',
          type: 'bar',
          barMaxWidth: 20,
          data: [800, 760]
        }]
      }
      this.myChart.setOption(option)
    }
  }
</script>

<style lang="css" scoped>
</style>
