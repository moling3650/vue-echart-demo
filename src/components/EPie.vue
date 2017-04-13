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
        timer: null
      }
    },
    mounted () {
      this.init()
      // this.fetchDate()
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
        this.myChart = this.echarts.init(this.$refs['e-pie'])
        let option = {
          title: {
            text: '不良数量',
            left: 'center'
          },
          tooltip: {},
          legend: {
            orient: 'vertical',
            data: [],
            right: '10%',
            top: 'middle'
          },
          color: ['#418ebd', '#44c57e', '#eeee68'],
          series: [{
            name: '不良数量',
            type: 'pie',
            radius: [0, '55%'],
            center: ['30%', '50%'],
            data: [],
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
      },
      fetchData () {
        this.$http.get(`/DataAPI/ProduceReport/productionDayReport.ashx?WorkShopCode=${this.wsCode}&ActType=${this.api}&P_date=${this.date}`).then(res => {
          let dataList = res.data.reasontypeDateList
          this.myChart.setOption({
            legend: {
              data: dataList.map(item => item.reasontype_name)
            },
            series: [{
              data: dataList.map(item => ({ name: item.reasontype_name, value: item.qty }))
            }]
          })
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
