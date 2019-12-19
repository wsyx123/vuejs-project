<template>
<div id="admin">
  <pagetitle></pagetitle>
  <Menu></Menu>
  <div id="right-main">
    <router-view></router-view>
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
    }
  }
}
</script>
<style scoped>
</style>
