<template>
<div>
  <div id="left-menu">
    <div id="asset-title">{{username}}<span style="font-size: 14px;color:#C0C0C0;"> -{{role}}</span></div>
    <div>
      <div id="asset-host" v-for="(menu,index) in menus">
        <span id="asset-title-second"> {{menu.name}}</span>
        <ul class="nav navbar asset-list">
          <li v-for="(children,index) in menu.children"><router-link :to="{path:children.path}"><i :class="children.icon" aria-hidden="true"></i> {{children.name}}</router-link></li>
          <li v-if="menu.signOut"><a @click="signOut" style="cursor: pointer;"><i class="fa fa-sign-out" aria-hidden="true"></i> 退出登录</a></li>
        </ul>
      </div>
    </div>
  </div>

</div>
</template>

<script>
export default {
  name: 'admin_menu',
  data () {
    return {
      username: sessionStorage.getItem('username'),
      role: sessionStorage.getItem('role'),
      menus: JSON.parse(sessionStorage.getItem('adminMenuItems'))
    }
  },
  methods:{
    signOut:function(){
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('hasMenu');
      sessionStorage.removeItem('logMenuItems');
      sessionStorage.removeItem('adminMenuItems');
      this.$router.push({path:'/login'});
    }
  }
}
</script>
<style scoped>
i{
  color:#167be0;
}
#asset-title{
  height:60px;
  padding: 17px 0px;
  font-size: 24px;
  line-height: 25px;
  color: #167be0;
  z-index: 3;
  text-align: center;
  border-bottom: 1px solid #e1e1e1;
}
#asset-host,#asset-group{
  margin-top:30px;
}
#asset-title-second{
  margin-left:20px;
  color:#888888;
  font-size:12px;
}
.asset-list li a{
  color:black;
  font-size:14px;
  padding-left:50px;
}
.router-link-active{
  background-color: #e2f0ff;
}
</style>
