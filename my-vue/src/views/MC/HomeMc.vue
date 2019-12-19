<template>
  <div class="home">
    <div class="home_top">
      <img :src="img" alt v-if="img" />
      <button @click="tuiFn" class="btn_tui">退出登录</button>
    </div>

    <div class="home_section">
      <router-view />
    </div>

    <div class="home_bottom">
      <div class="home_bottom_son" :index="itm.id" v-for="(itm,ind) in list" :key="itm.id">
        <div class="home_bottom_son_router">
          <span @click="showFn(ind)">{{itm.name}}</span>
          <div v-show="ind==idx"  class="home_bottom_son_spn" v-for="(item,index) in itm.children" :key="index">
            <p @click="clickFn(item.url)" :key="item.id">{{item.name}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Header } from "mint-ui";
import { homeget } from "@/service/loginget.js";
import { getToken, removeToken } from "@/utils/tokencookie.js";
// import {mapState} from 'vuex'
export default {
  props: {},
  components: {},
  data() {
    return {
      list: [],
      img: "",
      falg: false,
      idx: 0
    };
  },
  computed: {},
  methods: {
    clickFn(url) {
      console.log(url,'urkl')
      this.$router.push(url);
    },
    showFn(index) {
        console.log(index,'index')
      this.idx = index;
    },
    tuiFn() {
      removeToken();
      this.$router.push("/login");
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  created() {
    // console.log(getToken(),'datas')
    let token = getToken();
    if (token) {
      homeget("/home", token)
        .then(data => {
          if (data.code == 1) {
            this.list = data.list;
            if (data.img) {
              this.img = data.img;
            }
          } else {
            this.$router.push("/login");
          }
        })
        .catch(err => {
          console.log(err, "err---home");
        });
    } else {
      this.$router.push("/login");
    }
  },
  mounted() {}
};
</script>
<style scoped lang="less">
.flex() {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.home {
  width: 100%;
  height: 100%;
  background: url(https://img.kaikeba.com/50117191219102ghcf.jpg) no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  flex-direction: column;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0;
  padding: 0;
  .home_top {
    width: 100%;
    height: 1.2rem;
    border-bottom: 0.01rem solid #ccc;
    .flex();
    img {
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 50%;
      border: 0.01rem solid #ccc;
    }
    button {
      width: 2rem;
      height: 0.6rem;
      border: 0;
      background: dimgrey;
    }
  }
  .home_section {
    width: 100%;
    height: 100%;
    overflow: auto;
    color: #fff;
  }
  .home_bottom {
    width: 100%;
    height: 1.2rem;
    color: #fff;
    overflow: hidden;
    border-top: 0.01rem solid #ccc;
    .flex();
    .home_bottom_son {
      width: 100%;
      height: 1.1rem;
      .flex();
      .home_bottom_son_router {
        height: 1.1rem;
        text-align: center;
        color: #fff;
        line-height: 1.1rem;
        text-align: center;
        .home_bottom_son_spn{
          position: fixed;
          bottom: 1rem;
          left: 0;
          width: 100%;
    background-image: linear-gradient(top right, #110f0f);
          height: 0.8rem;
          box-shadow: 0px 0px 10px #d6d1d1;
          .flex();
            p {
              display: block;
              color: #fff;
            }
        }
      }
    }
  }
}
</style>