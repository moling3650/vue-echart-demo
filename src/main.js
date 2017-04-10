// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Echarts from 'echarts'
import axios from 'axios'
import App from './App'
import { DatePicker, Option, Select } from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.config.productionTip = false
Vue.prototype.echarts = Echarts
Vue.prototype.$http = axios
Vue.use(DatePicker)
Vue.use(Option)
Vue.use(Select)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
