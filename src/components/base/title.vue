<template>
<nav class="navbar navbar-default navbar-fixed-top" style="background-color:#147be0!important; padding:0px;" role="navigation">
    <div class="container-fluid">
        <div class="navbar-header">
            <a href="#" class="navbar-brand" style="margin:0;padding:0;"><img v-bind:src="logo_pic" style="height: 50px;margin: 15px;"></a>
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse">
                <span class="sr-only">切换导航</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
        </div>
        <div class="collapse navbar-collapse" id="navbar-collapse">
            <ul class="nav navbar-nav navbar-left" style="margin-top:0;margin-left:35px;">
      				<li v-for="(menu,index) in menus">
      					<router-link :to="{path:menu.router}">
      						<i v-bind:class="menu.icon" aria-hidden="true"></i>
      						<div>{{ menu.name}}</div>
      					</router-link>
      				</li>
            </ul>
			   <ul class="nav navbar-nav navbar-right" >
		     	<li>
            <router-link :to="{path: '/admin'}">
              <i class="fa fa-user-circle" aria-hidden="true"></i>
              <div>用户中心</div>
            </router-link>
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
    		{name:'日志搜索',icon:'fa fa-2x fa-file-text-o',router:'/log'}
    	]
  	}
    
  },
  mounted: function () {
  }
}
</script>

<style scoped>

</style>
