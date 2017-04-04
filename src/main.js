// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Echarts from 'echarts'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.echarts = Echarts

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
