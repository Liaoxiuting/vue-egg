<template>
  <div class="useradmi">
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
        <span>-</span>
        <b>{{itm.conts}}</b>
        <span>+</span>
      </h4>
      <p>
        {{ itm.texts}}
      </p>
    </div>
  </div>
</template>
<script>
import { mapState ,mapActions} from "vuex";
export default {
  props: {},
  components: {},
  data() {
    return {
      data: [],
    };
  },
  computed: {
    ...mapState("useradmi", ["list"])
  },
  methods: {
    ...mapActions('useradmi',['shopIng'])
  },
  created() {
    this.shopIng()
    console.log(navigator.userAgent.toLowerCase().match(/(ipod|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|wince)/i) != null,'000000000')
  },
  mounted() {}
};
</script>
<style scoped lang="less">
.useradmi {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  h1,h2,h3,h4,h5,h6{
    font-style: normal;
  }
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
</style>