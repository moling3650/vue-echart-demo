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
    data () {
      return {
        myChart: null,
        timer: null,
        dates: [],
        option: {
          title: {
            text: this.title,
            left: 'center'
          },
          tooltip: {},
          legend: {
            orient: 'vertical',
            right: 0,
            top: 'middle'
          },
          grid: {
            top: 35,
            right: 130,
            bottom: 10,
            left: 10,
            containLabel: true
          },
          xAxis: {
          },
          yAxis: {
          },
          color: ['#61a0a8', '#2f4554', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
        }
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
        this.myChart = this.echarts.init(this.$refs['e-line'])
      },
      dateFormatter (value) {
        let date = new Date(value)
        return `${date.getMonth() + 1}月${date.getDate()}日`
      },
      fetchData () {
        this.$http.get(`/DataAPI/ProduceReport/productionDayReport.ashx?WorkShopCode=${this.wsCode}&ActType=${this.api}&P_date=${this.date}`).then(res => {
          let dataList = []
          if (this.api === 'GetNPH') {
            dataList = res.data.nphDateList
          } else if (this.api === 'GetDrate') {
            dataList = res.data.drateDateList
          }

          // console.log(Array.from(new Set(dataList.map(item => item.p_date))).sort())
          this.dates = Array.from(new Set(dataList.map(item => item.p_date))).sort()

          let dataObj = {}
          dataList.map(item => {
            if (!dataObj[item.p_name]) {
              dataObj[item.p_name] = []
            }
            let idx = this.dates.findIndex(date => date === item.p_date)
            dataObj[item.p_name][idx] = item
          })
          dataList = []
          for (let key in dataObj) {
            dataList.push({
              name: key,
              type: 'line',
              data: dataObj[key].map(item => this.api === 'GetNPH' ? item.nph : item.drate)
            })
          }
          this.option.legend.data = dataList.map(item => item.name)
          this.option.xAxis.data = this.dates.map(date => this.dateFormatter(date))
          this.option.series = dataList
          this.myChart.setOption(this.option, true)
          if (this.interval) {
            clearTimeout(this.timer)
            this.timer = setTimeout(this.fetchData, this.interval)
          }
        })
      }
    }
  }
</script>

<style lang="css" scoped>
</style>
