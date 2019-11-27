<template>
<div id="home">
  <pagetitle></pagetitle>
  <Menu></Menu>
  <div id="content">
    <router-view></router-view>
  </div>
</div>
</template>

<script>
import Menu from '../menu/log_menu'
export default {
  name: 'asset',
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

</style>
