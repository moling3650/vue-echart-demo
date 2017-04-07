<template>
  <div class="e-pie" ref="e-pie" :style="{width, height}"></div>
</template>

<script>
  export default {
    name: 'EPie',
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
      this.myChart = this.echarts.init(this.$refs['e-pie'])

      let option = {
        title: {
          text: '不良数量',
          left: 'center'
        },
        tooltip: {},
        legend: {
          orient: 'vertical',
          data: ['物料不良', '作业不良', '设备不良'],
          right: '10%',
          top: 'middle'
        },
        color: ['#418ebd', '#44c57e', '#ffff68'],
        series: [{
          name: '不良数量',
          type: 'pie',
          radius: [0, '55%'],
          center: ['30%', '50%'],
          data: [
          {value: 20, name: '物料不良'},
          {value: 30, name: '作业不良'},
          {value: 50, name: '设备不良'}
          ],
          label: {
            normal: {
              position: 'inner',
              formatter: '{d}%',
              textStyle: {
                color: '#333',
                fontWeight: 'bold',
                fontSize: 14
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
