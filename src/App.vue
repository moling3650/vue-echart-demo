<template>
  <div id="app">
    <header>
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
    <div>
      <e-bar width="50%" height="200px" :wsCode="workShopCode"></e-bar>
      <e-table></e-table>
    </div>
    <div>
      <e-line width="50%" height="200px" title="车间NPH推移" api="GetNPH" :wsCode="workShopCode" :date="formatDate"></e-line>
      <e-line width="50%" height="200px" title="车间不良推移" api="GetDrate" :wsCode="workShopCode" :date="formatDate"></e-line>
    </div>
    <div>
      <bar width="40%" height="200px" title="不良现象分布" api="GetNgCode" :wsCode="workShopCode" :date="formatDate"></bar>
      <bar width="40%" height="200px" title="不良原因分布" api="GetReasonCode" :wsCode="workShopCode" :date="formatDate"></bar>
      <e-pie width="20%" height="200px" api="GetReasonCodeType" :wsCode="workShopCode" :date="formatDate"></e-pie>
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
      }
    }
  },
  computed: {
    formatDate () {
      return `${this.pDate.getFullYear()}-${this.pDate.getMonth() + 1}-${this.pDate.getDate()}`
    }
  },
  created () {
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

  .e-bar {
    display: inline-block;
  }

  .e-table {
    display: inline-block;
    width: 50%;
    vertical-align: top;
  }

  .e-line {
    display: inline-block;
  }

  .bar {
    display: inline-block;
  }

  .e-pie {
    display: inline-block;
  }
</style>
