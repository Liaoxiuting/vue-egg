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
#app {
  width: 100%;
  height: 100%;
}
p{
  width: 20%;
  height: 25px;
  background: darkgrey;
  text-align: center;
}
.list{
  background: thistle;
  border:1px solid darkslategray;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.active{
  background: deepskyblue;
  color: #fff;
}
</style>
