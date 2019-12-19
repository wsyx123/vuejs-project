import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const commonRoutes = [
    {
      path: '/',
      component: () => import('@/components/dashboard/Home.vue')
    },
    {
      path: '/login',
      component: () => import('@/components/login.vue')
    }
  ]

export default new Router({
  //mode:"history",
  routes: commonRoutes
})