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
      },
      date: {
        type: String,
        required: true
      },
      interval: {
        type: Number,
        default: 0
      }
    },
    watch: {
      wsCode: function (value, oldValue) {
        value && this.fetchData()
      },
      date: function (value, oldValue) {
        value && this.fetchData()
      }
    },
    data () {
      return {
        myChart: null,
        timer: null
      }
    },
    methods: {
      init () {
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
            right: 100,
            bottom: 10,
            left: 10,
            containLabel: true
          },
          xAxis: {
          },
          yAxis: {
            data: [],
            axisLabel: {
              rotate: 0
            },
            axisTick: {
              length: 999
            }
          },
          color: ['#bfdbff', '#418ebd', '#44c57e'],
          series: [{
            name: '计划',
            type: 'bar',
            barMaxWidth: 20
          }, {
            name: '投产',
            type: 'bar',
            barMaxWidth: 20
          }, {
            name: '完成',
            type: 'bar',
            barMaxWidth: 20
          }]
        }
        this.myChart.setOption(option)
      },
      fetchData () {
        this.$http.get(`/DataAPI/ProduceReport/productionDayReport.ashx?WorkShopCode=${this.wsCode}&ActType=GetItemDataP&P_date=${this.date}`).then(res => {
          let dataList = res.data.map(item => item.dataP)
          this.myChart.setOption({
            yAxis: {
              data: dataList.map(item => item.P_name)
            },
            series: [{
              data: dataList.map(item => item.PlanQty)
            }, {
              data: dataList.map(item => item.ProductionQty)
            }, {
              data: dataList.map(item => item.ComPleteQty)
            }]
          })
          if (this.interval) {
            clearTimeout(this.timer)
            this.timer = setTimeout(this.fetchData, this.interval)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    mounted () {
      this.init()
      this.fetchData()
    }
  }
</script>

<style lang="css" scoped>
</style>
