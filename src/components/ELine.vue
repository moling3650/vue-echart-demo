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
        dataList: [],
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
    computed: {
      dates () {
        return Array.from(new Set(this.dataList.map(item => item.p_date))).sort()
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
      listFormatter (list) {
        for (let i = 1; i < list.length; i++) {
          if (list[i] === undefined) {
            list[i] = list[i - 1]
          }
        }
        return list
      },
      fetchData () {
        this.$http.get(`/DataAPI/ProduceReport/productionDayReport.ashx?WorkShopCode=${this.wsCode}&ActType=${this.api}&P_date=${this.date}`).then(res => {
          if (this.api === 'GetNPH') {
            this.dataList = res.data.nphDateList
          } else if (this.api === 'GetDrate') {
            this.dataList = res.data.drateDateList
          }

          let dataObj = {}
          this.dataList.map(item => {
            if (!dataObj[item.p_name]) {
              dataObj[item.p_name] = []
            }
            let idx = this.dates.findIndex(date => date === item.p_date)
            dataObj[item.p_name][idx] = (this.api === 'GetNPH') ? item.nph : item.drate
          })
          let dataList = []
          for (let key in dataObj) {
            dataList.push({
              name: key,
              type: 'line',
              data: this.listFormatter(dataObj[key])
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
