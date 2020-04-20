<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
    }
  }
}
</script>

<style lang=''>
*{
  margin: 0;padding: 0;
}
html,body{
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
  background: url(https://img.kaikeba.com/72809150219102rmia.jpg) center;
  background-size: 100% 100%;
}
</style>
