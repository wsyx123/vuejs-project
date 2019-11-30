// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias
import Vue from 'vue'
import App from '@/components/base/base'
import router from './router'
import axios from 'axios'
Vue.prototype.$ajax = axios

axios.defaults.withCredentials=true //自动保存cookie

import pagetitle from '@/components/base/title'
import {Parent,Children} from './permission/admin'

Vue.config.productionTip = false // 阻止启动生产消息
Vue.component('pagetitle', pagetitle)


 /* 获取配置文件信息 */
axios.get('/static/config.json').then(res => {
	const configData = res.data;
	Vue.prototype.Apiserver = configData.logServer;
})

// http response 拦截器
axios.interceptors.response.use(
  (response) => {
    return response;
  },function(error){
    const status = error.response.status;
    // 如果认证失败 表明 token过期, 跳转到登录页面重新登录
    if(status === 401){
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('hasMenu');
      router.replace('/login');
    }
    return error.response
  }
);

// 获取菜单和路由表
function getMenusRouters(token){

  axios.get('http://localhost:8080/menus',{
    headers:{
      'content-type': 'application/json',
      'token': token
    }
  }).then(res => {
    const data = res.data;
    const accessedRouters = formatRouters(data.routers);
    router.addRoutes(accessedRouters);
    sessionStorage.setItem('adminMenuItems',JSON.stringify(data.menus.admin));
    sessionStorage.setItem('logMenuItems',JSON.stringify(data.menus.log));
    sessionStorage.setItem('routerItems',JSON.stringify(data.routers));
  })
}

// 构造路由
function formatRouters(routersData){
  const routersArray = []
  routersData.forEach(v=>{
    const routerDict = Parent[v['name']]
    routerDict['name'] = v['name']
    routerDict['path'] = v['path']
    routerDict['children'] = []
    v['children'].forEach(c =>{
      const cDict = Children[c['name']]
      cDict['name'] =c['name']
      cDict['path'] =c['path']
      routerDict['children'].push(cDict)
    })
    routersArray.push(routerDict)
  })
  return routersArray;
}

// 路由认证判断
router.beforeEach((to, from, next) => {
  //if (to.matched.some(record => record.meta.requireAuth)){ // 判断该路由是否需要登录权限
  if (to.path != '/login'){ // 所有的非登录路由都要判断
    if (sessionStorage.token) { // 判断当前的user_id是否存在 ； 登录存入的user_id
      if(!sessionStorage.hasMenu){ // 如果还没有获取菜单则获取路由和菜单
        getMenusRouters('token');
      	sessionStorage.setItem('hasMenu',true);
      }
      next();
    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 将要跳转路由的path作为参数，传递到登录页面
      })
    }
  }
  else {
    next();
  }
})

new Vue({
  el: '#App',
  router,
  components: { App },
  template: '<App/>',
  created(){
    if(sessionStorage.getItem('hasMenu')){
      const routers = JSON.parse(sessionStorage.getItem('routerItems'));
      const accessedRouters = formatRouters(routers);
      console.log(accessedRouters);
      router.addRoutes(accessedRouters);
    }
  }
})
