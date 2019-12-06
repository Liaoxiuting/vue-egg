<template>
  <div class="useradmi">
    <div class="box" v-for="itm in data" :key="itm.id">
        <h3>
            {{itm.titles}}
        </h3>
      <p>{{ itm.texts}}</p>
      <img :src="itm.imgs" alt="">
    </div>
  </div>
</template>
<script>
import { shopingget } from "@/service/loginget.js";
export default {
  props: {},
  components: {},
  data() {
    return {
      data: []
    };
  },
  computed: {},
  methods: {},
  created() {
    if (localStorage.getItem("swjtoken")) {
      shopingget("/shopgin").then(list => {
        console.log(list, "--list---");
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
}
.box{
    width: 100%;
    height: 5rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.box > img{
    width: 4rem;
    height: 5rem;
}
</style>