<template>
<div id="admin">
  <pagetitle></pagetitle>
  <Menu></Menu>
  <div id="content">
    <router-view></router-view>
    <div id="content-menu">
      <div id="host-title">
        <span>操作记录</span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Menu from '../menu/admin_menu'
export default {
  name: 'admin',
  components: {
       Menu
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<style scoped>
#content-menu{
  position: fixed;
  top: 78px;
  height:60px;
  left: 220px;
  right: 0;
  background-color: #fff;
  font-size: 18px;
  z-index: 5;
}
</style>
