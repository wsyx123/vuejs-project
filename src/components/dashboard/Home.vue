<template>
<div>

  <pagetitle></pagetitle>

  <div id="home-content">
    <span>暂无数据</span>
    <span @click="test">test</span>
  </div>
</div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  methods:{
    test:function(){
      var obj = $("#home-content");
      console.log(obj);
    }
  }
}
</script>
<style scoped>
#home-content{
  margin-top:60px;
}
</style>
