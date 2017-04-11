<template>
  <div class="bar" ref="bar" :style="{width, height}"></div>
</template>

<script>
  export default {
    name: 'bar',
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
      },
      wsCode: {
        type: String,
        required: true
      },
      date: {
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
    },
    watch: {
      wsCode: function (value, oldValue) {
        value && this.fetchData()
      },
      date: function (value, oldValue) {
        value && this.fetchData()
      }
    },
    methods: {
      init () {
        this.myChart = this.echarts.init(this.$refs.bar)
        let option = {
          title: {
            text: this.title,
            left: 'center'
          },
          tooltip: {},
          grid: {
            right: 80
          },
          xAxis: {
            data: []
          },
          yAxis: {
          },
          color: ['#418ebd'],
          series: [{
            name: '数量',
            type: 'bar',
            data: [],
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
      },
      fetchData () {
        this.$http.get(`/DataAPI/ProduceReport/productionDayReport.ashx?WorkShopCode=${this.wsCode}&ActType=${this.api}&P_date=${this.date}`).then(res => {
          var dataList = []
          if (this.api === 'GetNgCode') {
            dataList = res.data.ngcodeDateList
          } else if (this.api === 'GetReasonCode') {
            dataList = res.data.reasonDateList
          }
          this.myChart.setOption({
            xAxis: {
              data: dataList.map(item => this.api === 'GetNgCode' ? item.ng_name : item.reason_name)
            },
            series: [{
              data: dataList.map(item => item.qty)
            }]
          })
        })
      }
    }
  }
</script>

<style lang="css" scoped>
</style>
