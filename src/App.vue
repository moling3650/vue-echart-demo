<template>
  <div id="app">
    <header style="height: 64px;">
      <h1 class="title">车间日生产看板</h1>
      <nav class="nav">
        <ul>
          <li class="nav-item">
            <el-select v-model="workShopCode" placeholder="请选择车间">
              <el-option
                v-for="item in workShopOpts"
                :label="item.WorkShopName"
                :value="item.WorkShopCode"
                :key="item.WorkShopCode">
              </el-option>
            </el-select>
          </li>
          <li class="nav-item">
            <el-date-picker
              v-model="pDate"
              type="date"
              :picker-options="pickerOptions">
            </el-date-picker>
          </li>
        </ul>
      </nav>
    </header><!-- /header -->
    <div class="box" v-if="firstBlockHeight">
      <e-bar width="50%" :height="firstBlockHeight + 'px'" :wsCode="workShopCode" :date="formatDate" :interval="interval"></e-bar>
      <e-table :height="firstBlockHeight" :wsCode="workShopCode" :date="formatDate" :interval="interval"></e-table>
    </div>
    <div class="box" v-if="restBlockHeight">
      <e-line width="50%" :height="restBlockHeight * 1.2 + 'px'" title="车间UPH推移" api="GetNPH" :wsCode="workShopCode" :date="formatDate" :interval="interval"></e-line>
      <e-line width="50%" :height="restBlockHeight * 1.2 + 'px'" title="车间不良推移" api="GetDrate" :wsCode="workShopCode" :date="formatDate" :interval="interval"></e-line>
    </div>
    <div class="box" v-if="restBlockHeight">
      <bar width="40%" :height="restBlockHeight * 0.8 + 'px'" title="不良现象分布" api="GetNgCode" :wsCode="workShopCode" :date="formatDate" :interval="interval"></bar>
      <bar width="40%" :height="restBlockHeight * 0.8 + 'px'" title="不良原因分布" api="GetReasonCode" :wsCode="workShopCode" :date="formatDate" :interval="interval"></bar>
      <e-pie width="20%" :height="restBlockHeight * 0.8 + 'px'" api="GetReasonCodeType" :wsCode="workShopCode" :date="formatDate" :interval="interval"></e-pie>
    </div>
  </div>
</template>

<script>
import Bar from './components/Bar'
import ETable from './components/ETable'
import ELine from './components/ELine'
import EPie from './components/EPie'
import EBar from './components/EBar'

export default {
  name: 'app',
  components: {
    Bar,
    ETable,
    ELine,
    EPie,
    EBar
  },
  data () {
    return {
      workShopCode: '',
      workShopOpts: [],
      pDate: new Date(),
      pickerOptions: {
        disabledDate (time) {
          return Date.now() < time.getTime()
        }
      },
      firstBlockHeight: 0,
      restBlockHeight: 0,
      interval: 60000
    }
  },
  computed: {
    formatDate () {
      return `${this.pDate.getFullYear()}-${this.pDate.getMonth() + 1}-${this.pDate.getDate()}`
    }
  },
  created () {
    this.firstBlockHeight = parseInt((document.documentElement.clientHeight - 80) * 0.4)
    this.restBlockHeight = parseInt((document.documentElement.clientHeight - 80) * 0.3)
    this.$http.get('/DataAPI/Commom.ashx').then(res => {
      this.workShopOpts = res.data
      if (this.workShopOpts.length) {
        this.workShopCode = this.workShopOpts[0].WorkShopCode
      }
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style>
  #app {
    font-size: 0;
  }

  .title {
    display: inline-block;
    width: 60%;
    font-size: 24px;
    text-align: center;
  }

  .nav {
    display: inline-block;
    width: 40%;
    margin-bottom: 10px;
    text-align: right;
  }

  .nav-item {
    display: inline-block;
    width: 50%;
    /* border: 1px solid #000; */
    font-size: 16px;
    text-align: center;
  }


  .e-table {
    width: 50%;
    vertical-align: top;
  }

  .e-line,
  .e-bar,
  .bar,
  .e-pie,
  .e-table {
    display: inline-block;
  }

  .box {
    border: 1px solid #000;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .box:not(:last-child) {
    border-bottom: none;
  }

  .box > div:not(:last-child) {
    border-right: 1px solid #000;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }


/*   @media only screen and (min-width: 768px) {
    .e-line {
      display: inline-block;
    }
  } */
</style>
