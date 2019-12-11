<template>
  <div class="useradmi">
    <div class="box" v-for="itm in data" :key="itm.id">
        <img :src="itm.imgs" alt="">
        <h3>
            {{itm.titles}}
        </h3>
        <h4>
          <span>
            -
          </span>
          <b>
            {{itm.conts}}
          </b>
          <span>
            +
          </span>
        </h4>
        <p>{{ itm.texts}}
          <!-- <b>{{datas}}</b> -->
        </p>
    </div>
  </div>
</template>
<script>
import { shopingget } from "@/service/loginget.js";
import { getToken } from '@/utils/tokencookie.js';
import { mapState } from 'vuex'
export default {
  props: {},
  components: {},
  data() {
    return {
      data: []
    };
  },
  computed: {
    // ...mapState('login',['datas'])
  },
  methods: {
  },
  created() {
    console.log('datas',this.datas)
    if (getToken()) {
      shopingget("/shopgin").then(list => {
        this.data = list;
      });
    }
  },
  mounted() {}
};
</script>
<style scoped lang="">
.useradmi {
  width: 100%;
  height: 100%;
  margin: 0;padding: 0;
  display: flex;
  flex-wrap: wrap;
}
.box{
    width: 6rem;
    height: auto;
    flex-direction: column;
    display: flex;
    align-items: center;
}
.box > img{
    width: 4rem;
}
.box > h3{
    width:100%;
    height: 1rem;
    line-height: 1rem;
}
.box>h4{
    width:4rem;
    height: 1rem;
    line-height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.box > p{
    width:100%;
    height: 1rem;
    line-height: 1rem;
}
</style>