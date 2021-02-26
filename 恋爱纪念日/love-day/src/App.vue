<template>
<div id="app">
  <!-- <h5 style="color:#fff;">走过了人间四季,也看过了日出日落,觉得还是两个人在一起的春夏秋冬更让人觉得珍贵。</h5>
  <LoveDay/> -->
  <FollwProgram/>
</div>
</template>

<script>
// import LoveDay from './view/LoveDay.vue'
import FollwProgram from './view/followGrongram.vue'
export default {
  name: 'App',
  components: {
    // LoveDay,
    FollwProgram
  },
  data(){
    return {
    }
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  text-align: center;
}
</style>
