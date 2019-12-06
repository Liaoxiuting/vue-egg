<template>
  <div class="home">
    <el-container>
      <el-aside width="5rem">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-submenu :index="itm.id" v-for="itm in list" :key="itm.id">
            <template slot="title">
              <i class="el-icon-message"></i>
              {{itm.name}}
            </template>
            <el-menu-item-group v-for="(item,index) in itm.children" :key="index">
              <template slot="title">{{item.id}}</template>
              <el-menu-item :index="item.id" @click="clickFn(item.url)" :key="item.id">{{item.name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header height="2rem">
          <img :src="img" alt v-if="img" />
          <button @click="tuiFn">
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
export default {
  props: {},
  components: {},
  data() {
    return {
      list: [],
      img: ""
    };
  },
  computed: {},
  methods: {
    clickFn(url) {
      this.$router.push(url);
    },
    tuiFn(){
        localStorage.clear('wsjtoken')
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  created() {
    if (localStorage.getItem("swjtoken")) {
      homeget("/home", localStorage.getItem("swjtoken"))
        .then(data => {
          this.list = data.list;
          if (data.img) {
            this.img = data.img;
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
}

.el-container {
  width: 100%;
  height: 100%;
}
.el-header > img {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
}
.el-header,
.el-footer {
  background-image: linear-gradient(top right, rgb(52, 189, 52), #e2df30);
  color: #333;
  text-align: center;
  line-height: 30px;
}
.el-aside {
  background-image: linear-gradient(top, rgb(25, 115, 199), #c01f55);
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-menu {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-image: linear-gradient(top, rgb(25, 115, 199), #c01f55);
}
.el-menu-item {
  background-image: linear-gradient(left, rgb(48, 139, 224), #eb5c8b);
}
.el-main {
  width: 100%;
  height: 100%;
  background-color: #e9eef3;
  background-image: linear-gradient(left top, rgb(238, 240, 212), #d8340b);
  color: #333;
  text-align: center;
  line-height: 160px;
}

/* body > .el-container {
    margin-bottom: 40px;
  } */

/* .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  } */
</style>