<template>
  <div class="home">
    <el-container>
      <el-aside width="5rem">
        <el-menu
          width="100%"
          default-active="2"
          @open="handleOpen"
          @close="handleClose"
          class="el-menu-vertical-demo"
          background-color="#000"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu :index="itm.id" v-for="itm in list" :key="itm.id">
            <span slot="title">
              <i class="el-icon-message"></i>
              {{itm.name}}
            </span>
            <el-menu-item v-for="(item,index) in itm.children" :key="index">
              <el-menu-item :index="item.id" @click="clickFn(item.url)" :key="item.id">{{item.name}}</el-menu-item>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header height="2rem">
          <img :src="img" alt v-if="img" />
          <button @click="tuiFn" class="btn_tui" >
              退出登录
          </button>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
        <el-footer height="2rem">
            <h3>余罪</h3>
          <p>混的好久混，混不混叫混混</p>
          <p>就算有一天一无所有，也不缺重头再来的勇气</p>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { homeget} from "@/service/loginget.js";
import { getToken ,removeToken} from '@/utils/tokencookie.js';
// import {mapState} from 'vuex'
export default {
  props: {},
  components: {},
  data() {
    return {
      list: [],
      img: "",
      falg:false
    };
  },
  computed: {
  },
  methods: {
    clickFn(url) {
      this.$router.push(url);
    },
    tuiFn(){
      removeToken()
      this.$router.push("/login")
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
    let token=getToken();
    if (token) {
      homeget("/home", token)
        .then(data => {
          if (data.code==1) {
              this.list = data.list;
            if (data.img) {
              this.img = data.img;
            }
          }else{
            this.$router.push("/login")
          }
        })
        .catch(err => {
          console.log(err, "err---home");
        });
    } else {this.$router.push("/login")}
  },
  mounted() {}
};
</script>
<style scoped lang="">
.home {
  width: 100%;
  height: 100%;
  background: #000;
}

.el-container {
  width: 100%;
  height: 100%;
}
.el-header > img {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  margin-right: 0.5rem;
}
.el-header{
  display: flex;
  align-items: center
}
.el-footer {
  color: #fff;
  font-weight: bold;
  text-align: center;
  line-height: 30px;
  background: #000;
}
.el-aside {
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-menu {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #000;
  color: #fff;
}
.el-menu-item {
  color: #fff;
  background: #333;
}
.el-main {
  width: 100%;
  height: 100%;
  color: #fff;
  text-align: center;
  background: #333;
}
.btn_tui{
  width: 1.5rem;
  height: 0.5rem;
  line-height: 0.5rem;
  background: #333;
  border:0;
  color: #fff;
}

</style>