<template>
  <div id="main-content">
    <div class="container_1"><img src="/static/images/404.png"></div>
    <div class="container_3"><!--<img src="images/404_1.png" >-->
       <div class="container_3_1"><span>SORRY你要访问的页面弄丢了</span></div>
       <div class="container_3_2"><span>你可以通过以下方式重新访问......</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
      const oIframe = document.getElementById('main-content');
　　　 const deviceHeight = document.documentElement.clientHeight;
      oIframe.style.height = (deviceHeight) + 'px';
  }
}
</script>

<style scoped>
#main-content{
  background:url('/static/images/404bg.jpg');
  background-size: 100% 100%;
  width: 100%;
  background-repeat: no-repeat;
  text-align: center;
  padding-top: 100px; 
}
</style>
