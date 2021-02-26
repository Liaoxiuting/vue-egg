<template>
  <div class="hello">
    <h2>开始{{loveStartDate}}</h2>
    <h2>{{toDay}}</h2>
    <h2>{{differDay}}</h2>
  </div>
</template>

<script>
import {yyyymmddhhmmss} from '../components/DateFormat.js'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return {
      loveStartDate:new Date('2020-11-07').getTime(),
      toDay:new Date().getTime(),
    }
  },
  computed:{
    differDay(){
      return Math.floor((new Date(this.toDay).getTime()-new Date(this.loveStartDate).getTime())/ (24 * 3600 * 1000))
    }
  },
  created(){
    let _this=this;
    this.loveStartDate=yyyymmddhhmmss(new Date('2020-11-07'))
    this.toDay=yyyymmddhhmmss(new Date())
    setInterval(()=>{
      _this.toDay=yyyymmddhhmmss(new Date())
    },1000)
  },
  mounted(){},
  methods:{
  }
}
</script>

<style scoped long="sass">
*{
  font-family: STKaiti;
}
div{
}
  h2{
    color: aquamarine;
  }
</style>
