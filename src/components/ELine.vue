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
      },
      title: {
        type: String,
        default: '标题'
      },
      api: {
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
      this.init()
      this.fetchData()
    },
    methods: {
      init () {
        this.myChart = this.echarts.init(this.$refs['e-line'])
        let option = {
          title: {
            text: this.title,
            left: 'center'
          },
          tooltip: {},
          legend: {
            data: [this.api.slice(3)],
            right: 0,
            top: 'middle'
          },
          grid: {
            right: 80
          },
          xAxis: {
            data: [],
            axisLabel: {
              formatter (value, index) {
                var date = new Date(value)
                return `${date.getMonth() + 1}月${date.getDate()}日`
              }
            }
          },
          yAxis: {
          },
          color: ['#418ebd'],
          series: [{
            name: this.api.slice(3),
            type: 'line',
            data: []
          }]
        }
        this.myChart.setOption(option)
      },
      fetchData () {
        this.$http.get(`/DataAPI/ProduceReport/productionDayReport.ashx?WorkShopCode=001&ActType=${this.api}&P_date=2017-04-07`).then(res => {
          var dataList = []
          if (this.api === 'GetNPH') {
            dataList = res.data.nphDateList
          } else if (this.api === 'GetDrate') {
            dataList = res.data.drateDateList
          }
          this.myChart.setOption({
            xAxis: {
              data: dataList.map(item => item.p_date)
            },
            series: [{
              data: dataList.map(item => this.api === 'GetNPH' ? item.nph : item.drate)
            }]
          })
        })
      }
    }
  }
</script>

<style lang="css" scoped>
</style>
