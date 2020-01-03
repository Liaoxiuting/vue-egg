<template>
  <div class="useradmi">
    <div class="useradmi_son">
      <div class="box" v-for="itm in list" :key="itm.id">
        <img :src="itm.imgs" alt />
        <h3>{{itm.titles}}</h3>
        <h5>
          <b>限价：{{
            itm.many
          }}</b>
          <i>
            原价：{{
              itm.primary
            }}
          </i>
        </h5>
        <h4>
          <span @click="addRome(itm.id,itm.conts,'rome')">-</span>
          <b>{{itm.conts}}</b>
          <span @click="addRome(itm.id,itm.conts,'add')">+</span>
        </h4>
        <p>
          {{ itm.texts}}
        </p>
      </div>
    </div>
    <div class="zong">
        <h4>
          总价：{{zongFn}}
        </h4>
        <h4>
          总个数：{{gesuFn}}
        </h4>
    </div>
  </div>
</template>
<script>
import { mapState ,mapActions,mapMutations,mapGetters} from "vuex";
export default {
  props: {},
  components: {},
  data() {
    return {

    };
  },
  computed: {
    ...mapState("shop", ["list"]),
    ...mapGetters("shop", ["gesuFn","zongFn"])
  },
  methods: {
    ...mapMutations('shop',['addFn','romeFn']),
    ...mapActions('shop',['shopIng']),
    addRome(id,con,str){
      if (str=='add') {
        this.addFn(id)
      }else{
        this.romeFn(id)
      }
    }
  },
  created() {
    this.shopIng()
    // console.log(navigator.userAgent.toLowerCase().match(/(ipod|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|wince)/i) != null,'000000000')
  },
  mounted() {
  }
};
</script>
<style scoped lang="less">
.useradmi {
  width: 100%;
  height: 100%;
  margin: 0;
  text-align: center;
  overflow:auto;
  padding: 0;
  flex:1;
  .zong{
    width:2rem;
    height:1.5rem;
    background:#ccc;
    // position:fixed;
    position:absolute;
    bottom:2rem;
    right:0.5rem;
  }
  h1,h2,h3,h4,h5,h6{
    font-style: normal;
  }
  .useradmi_son{
    width:100%;
    height:auto;
    display: flex;
    flex-wrap: wrap;
    
    .box {
      width: 4.5rem;
      height: auto;
      flex-direction: column;
      display: flex;
      align-items: center;
      background: dimgray;
      margin:0.01rem 0.17rem;
      img {
        width: 4rem;
        height: 4rem;
        border-radius: 50%
      }
      h3 {
        width: 100%;
        height: 1rem;
        line-height: 1rem;
      }
      h5{
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        i{
          color: red;
          text-decoration:line-through;
        }
      }
      h4 {
        width: 4rem;
        height: 1rem;
        line-height: 1rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        span {
          font-size: 0.6rem;
        }
        b{
          font-size: 0.6rem;
        }
      }
      p {
        width: 100%;
        height: 1rem;
        line-height: 1rem;
      }
    }
  }
}
</style>