<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{loveStartDate}}</h2>
    <h2>{{toDay}}</h2>
    <h2>{{differDay}}</h2>
  </div>
</template>

<script>
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
    this.loveStartDate=this.yyyymmddhhmmss(new Date('2020-11-07'))
    this.toDay=this.yyyymmddhhmmss(new Date())
    setInterval(()=>{
      _this.toDay=_this.yyyymmddhhmmss(new Date())
    },1000)
  },
  mounted(){},
  methods:{
    yyyymmddhhmmss(str){
            var yearstr = str.getFullYear() + '-';
            var monthstr = (str.getMonth() + 1 < 10 ? '0' + (str.getMonth() + 1) : str.getMonth() + 1) + '-';
            var datesstr = (str.getDate() < 10 ? '0' + (str.getDate()) : str.getDate()) + ' ';
            var hourstr = (str.getHours() < 10 ? '0' + (str.getHours()) : str.getHours()) + ':';
            var minutestr = (str.getMinutes() < 10 ? '0' + (str.getMinutes()) : str.getMinutes()) + ':';
            var secondstr = (str.getSeconds() < 10 ? '0' + (str.getSeconds()) : str.getSeconds());
        return yearstr + monthstr + datesstr + hourstr + minutestr + secondstr;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
