<template>
<nav class="navbar navbar-default navbar-fixed-top" style="background-color:#147be0!important; padding:0px;" role="navigation">
    <div class="container-fluid">
        <div class="navbar-header">
            <a href="/" class="navbar-brand" style="margin:0;padding:0;"><img v-bind:src="logo_pic" style="height: 50px;margin: 15px;"></a>
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse">
                <span class="sr-only">切换导航</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
        </div>
        <div class="collapse navbar-collapse" id="navbar-collapse">
            <ul class="nav navbar-nav navbar-left" style="margin-top:0;margin-left:0px;">
      				<li v-for="(menu,index) in menus">
      					<router-link :to="{path:menu.router}">
      						<i v-bind:class="menu.icon" aria-hidden="true"></i>
      						<div>{{ menu.name}}</div>
      					</router-link>
      				</li>
            </ul>
			<ul class="nav navbar-nav navbar-right" >
		     	<li>
					<a href="#">
						<i class="fa fa-user-circle" aria-hidden="true"></i>
						<div>admin</div>
					</a>
				</li>
		     	<li>
					<a href="#">
						<i class="fa fa-bell-o" aria-hidden="true"></i>
						<div>通知</div>
					</a>
				</li>
				<li>
					<a href="#">
						<i class="fa fa-question-circle" aria-hidden="true"></i>
						<div>关于</div>
					</a>
				</li>
		    </ul>
        </div>
    </div>
</nav>
</template>

<script>
import logo_pic from '@/assets/image/home/cloud.png'
export default {
  name: 'NavbarHeader',
  data () {
  	return{
  		logo_pic:logo_pic,
    	menus:[
    		{name:'首页',icon:'fa fa-2x fa-home',router:'/'},
    		//{name:'资产管理',icon:'fa fa-2x fa-desktop',router:'/asset'},
    		//{name:'作业中心',icon:'fa fa-2x fa-coffee',router:'/task'},
    		//{name:'任务调度',icon:'fa fa-2x fa-cogs',router:'/schedule'},
    		{name:'日志搜索',icon:'fa fa-2x fa-file-text-o',router:'/log/search'},
    		//{name:'监控告警',icon:'fa fa-2x fa-bar-chart',router:'/alert'},
    		//{name:'PAAS',icon:'fa fa-2x fa-cloud',router:'/paas'},
    		//{name:'应用发布',icon:'fa fa-2x fa-cube',router:'/app'},
    		//{name:'系统管理',icon:'fa fa-2x fa-cog',router:'/system'}
    	]
  	}
    
  },
  mounted: function () {
  }
}
</script>

<style scoped>
.navbar-fixed-bottom, .navbar-fixed-top {
    position: sticky;
    right: 0;
    left: 0;
    z-index: 1030;
}
.navbar{
	margin-bottom: 17px;
}
.navbar .nav .router-link-exact-active{
	color: #fff!important;
  background: rgba(0,0,0,0.35);
}

.navbar-default .navbar-nav>li>a {
	width: 82px;
	height: 78px;
	text-align: center;
	font-size: 13px;
  color: #ffffff!important;
}
.navbar .nav > li > a:hover {
	background: #25222259;
}
.navbar .nav > li > a:active {
	color: #fff!important;
}

.navbar-default .navbar-nav>.open>a, .navbar-default .navbar-nav>.open>a:focus, .navbar-default .navbar-nav>.open>a:hover {
  color: #555;
  background-color: #25222259;
}
</style>
