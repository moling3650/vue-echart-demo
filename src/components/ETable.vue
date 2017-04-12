<template>
  <div class="e-table" ref="e-table">
    <table class="table">
      <thead>
        <tr>
          <!-- <th>工单</th> -->
          <th :style="{paddingTop: pd, paddingBottom: pd}">成品</th>
          <th :style="{paddingTop: pd, paddingBottom: pd}">计划</th>
          <th :style="{paddingTop: pd, paddingBottom: pd}">达成</th>
          <th :style="{paddingTop: pd, paddingBottom: pd}">达成率</th>
          <th :style="{paddingTop: pd, paddingBottom: pd}">直通率</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in dataList" :key="idx">
          <!-- <td>{{item.Order_no}}</td> -->
          <td :style="{paddingTop: pd, paddingBottom: pd}">{{item.P_name}}</td>
          <td :style="{paddingTop: pd, paddingBottom: pd}">{{item.PlanQty}}</td>
          <td :style="{paddingTop: pd, paddingBottom: pd}">{{item.ComPleteQty}}</td>
          <td :style="{paddingTop: pd, paddingBottom: pd}">{{item.CompleteRate}}%</td>
          <td :style="{paddingTop: pd, paddingBottom: pd}">{{item.FPYRate}}%</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'ETable',
    props: {
      height: {
        type: Number,
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
        dataList: [],
        timer: null
      }
    },
    computed: {
      pd () {  // 单元格的上下补白，采用自动计算方案
        if (!this.dataList.length) {
          return '5px'
        }
        let restHeight = this.height - 21 * (2 + this.dataList.length)
        return parseInt(restHeight / (this.dataList.length + 1) / 2) + 'px'
      }
    },
    methods: {
      fetchData () {
        this.$http.get(`/DataAPI/ProduceReport/productionDayReport.ashx?WorkShopCode=${this.wsCode}&ActType=GetItemDataT&P_date=${this.date}`).then(res => {
          this.dataList = res.data.map(item => item.dataT)
          if (this.interval) {
            clearInterval(this.timer)
            this.timer = setTimeout(this.fetchData, this.interval)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    mounted () {
      this.fetchData()
    }
  }
</script>

<style lang="css" scoped>
  /* Border styles */
  table {
    font-family: arial;
    max-width: 100%;
    background-color: transparent;
    border-collapse: collapse;
    border-spacing: 0;
  }

  .table {
    width: 100%;
    margin-bottom: 20px;
    border: 1px solid #aaa;
  }

  .table th,
  .table td {
    font-weight: normal;
    font-size: 12px;
    padding: 5px 15px;
    line-height: 20px;
    text-align: left;
    vertical-align: middle;
    border-top: 1px solid #aaa;
  }

  .table th:not(:last-child),
  .table td:not(:last-child) {
    border-right: 1px solid  #aaa;
  }

  .table thead th {
    font-weight: bold;
    background: #bfdbff;
    vertical-align: bottom;
  }
  .table tbody > tr:nth-child(even) > td,
  .table tbody > tr:nth-child(even) > th {
    background-color: #f9f9f9;
  }
  .table .t-small {
    width: 5%;
  }
  .table .t-medium {
    width: 15%;
  }
  .table .t-status {
    font-weight: bold;
  }
  .table .t-active {
    color: #46a546;
  }
  .table .t-inactive {
    color: #e00300;
  }
  .table .t-draft {
    color: #f89406;
  }
  .table .t-scheduled {
    color: #049cdb;
  }

  .table th:nth-child(n), .table td:nth-child(n) {
    width: 40%;
  }

  .table th:nth-child(n+2), .table td:nth-child(n+2) {
    width: 15%;
    text-align: center;
  }
</style>
