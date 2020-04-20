<template>
  <div class="hello">
    <div v-for="(itm,indx) in data" :key="itm.id">
      <dinYan :class="{'active':ind===indx}" :itm="itm" :indx="indx" @wsjFn="wsjFn"/>
    </div>
    <div class="btn">
      <button @click="clickFn">添加</button>
      <p>总价：{{zongFn}}</p>
    </div>
  </div>
</template>

<script>
// import axios from 'axios''
import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
import dinYan from '../views/list.vue'
export default {
  data () {
    return {
      ind:0
    }
  },
  components:{dinYan},
  computed:{
      ...mapState(["data"]),
      ...mapState(['zong']),
      ...mapGetters(['zongFn'])
  },
  methods:{
    ...mapActions(['getArr']),
    ...mapMutations(['getFn']),
    clickFn(e){this.$router.push('/add')},
    wsjFn(indx){
      // console.log(indx,'ind')
      this.ind=indx
    }
  }
  ,
  created(){
    localStorage.list=JSON.stringify(this.data)
    this.getArr()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
