// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias
import Vue from 'vue'
import axios from 'axios'
axios.defaults.withCredentials=true
Vue.prototype.$ajax = axios
import App from '@/components/base/base'
import pagetitle from '@/components/base/title'
import overview from '@/components/dashboard/overview'
import resource from '@/components/dashboard/resource'
import monitor from '@/components/dashboard/monitor'
import router from './router'
import ECharts from 'vue-echarts/components/ECharts'
Vue.config.productionTip = false
/* eslint-disable no-new */
Vue.component('pagetitle', pagetitle)
Vue.component('overview', overview)
Vue.component('resource', resource)
Vue.component('monitor', monitor)
Vue.component('chart', ECharts)
new Vue({
  el: '#App',
  router,
  components: { App },
  template: '<App/>'
})
