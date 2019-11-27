import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/dashboard/Home'


// log components
import log from '@/components/log/log'
import search from '@/components/log/search'
import newDashboard from '@/components/log/newDashboard'
import importDashboard from '@/components/log/importDashboard'
import analysis from '@/components/log/analysis'
import join from '@/components/log/join'
import transmit from '@/components/log/transmit'


Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {path: '/home',component: Home},
      ]
    },
    {
      path: '/log',
      component: log,
      children: [
        {path: '/', component: search},
        {path: '/log/search', name:'search', component: search},
        {path: '/log/analysis',name:'analysis',component: analysis},
        {path: '/log/analysis/new',name:'newDashboard',component: newDashboard},
        {path: '/log/analysis/import',name:'importDashboard',component: importDashboard},
        {path: '/log/join',name:'join',component: join},
        {path: '/log/transmit',name:'transmit',component: transmit}
      ]
    }
  ]
})
