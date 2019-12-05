<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
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
  /* background-image: linear-gradient(top right,rgb(52, 189, 52),#e2df30); */
}
</style>
