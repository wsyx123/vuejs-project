<template>
<div id="home">
  <pagetitle></pagetitle>
  <Menu></Menu>
  <div id="right-main">
    <router-view></router-view>
  </div>
</div>
</template>

<script>
import Menu from '../menu/log_menu'
export default {
  name: 'log',
  components: {
       Menu
  },
  data () {
    return {
    }
  }
}
</script>
<style scoped>
</style>
