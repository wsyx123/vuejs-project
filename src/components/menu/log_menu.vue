<template>
<div>
  <div id="menu">
    <div id="asset-title">日志搜索</div>
    <div>
      <div id="asset-host">
        <span id="asset-title-second"> 日志搜索</span>
        <ul class="nav navbar asset-list">
          <li><router-link :to="{name:'search'}"><i class="fa fa-search" aria-hidden="true"></i> 快速检索</router-link></li>
        </ul>
      </div>

      <div id="asset-host">
        <span id="asset-title-second"> 日志分析</span>
        <ul class="nav navbar asset-list">
          <li><router-link :to="{name:'analysis'}"><i class="fa fa-area-chart" aria-hidden="true"></i> 业务分析</router-link></li>
        </ul>
      </div>

      <div id="asset-host">
        <span id="asset-title-second"> 日志接入</span>
        <ul class="nav navbar asset-list">
          <li><router-link :to="{ name: 'join' }"><i class="fa fa-anchor" aria-hidden="true"></i> 快速接入</router-link></li>
          <li><router-link :to="{ name: 'transmit' }"><img style="width:16px;height:16px;" v-bind:src="logstashPic">日志转发</router-link></li>
        </ul>
      </div>

      <div id="asset-host">
        <span id="asset-title-second"> 日志告警</span>
        <ul class="nav navbar asset-list">
          <li><router-link :to="{ name: 'join' }"><i class="fa fa-cogs" aria-hidden="true"></i> 告警设置</router-link></li>
          <li><router-link :to="{ name: 'transmit' }"><i class="fa fa-bell" aria-hidden="true"></i> 告警列表</router-link></li>
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
      logstashPic:logstashPic
    }
  }
}
</script>
<style scoped>
i{
  color:#167be0;
}
#menu{
  position:fixed;
  width: 220px;
  top: 78px;
  bottom: 0;
  z-index: 5;
  border-right: 1px solid #e1e1e1;
  overflow: hidden;
  background-color: #f7fafc;
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
