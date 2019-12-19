<template>
<div>
  <div id="left-menu">
    <div id="asset-title">日志搜索</div>
    <div>
      <div id="asset-host" v-for="(menu,index) in menus">
        <span id="asset-title-second"> {{menu.name}}</span>
        <ul class="nav navbar asset-list">
          <li v-for="(children,index) in menu.children"><router-link :to="{path:children.path}"><i :class="children.icon" aria-hidden="true"></i> {{children.name}}</router-link></li>
        </ul>
      </div>

    </div>
  </div>

</div>
</template>

<script>
import logstashPic from '@/assets/image/log/logo-logstash-64-color.svg'
export default {
  name: 'asset_menu',
  data () {
    return {
      logstashPic:logstashPic,
      menus: JSON.parse(sessionStorage.getItem('logMenuItems'))
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
  padding: 17px 35px;
  font-size: 18px;
  line-height: 25px;
  color: #167be0;
  z-index: 3;
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
