<template>
<div>

  <pagetitle></pagetitle>

  <div id="home-content">
    <overview></overview>
    <resource></resource>
    <monitor></monitor>
  </div>
</div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
    }
  }
}
</script>
<style scoped>
#home-content{
  margin-top:60px;
}
</style>
