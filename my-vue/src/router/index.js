import Vue from "vue";
import Router from "vue-router";
import { setToken, getToken, removeToken } from "@/utils/tokencookie.js";

import { isMobileFlag } from "@/utils/index.js";
import la from "./loadableComponent";
let isMc = (mc, pc) => {
  return isMobileFlag() ? la(mc) : la(pc);
};
//楼层
// import Loucheng from '@/components/loucheng'
// 购物车
import Login from "@/views/PC/Login.vue";
import LoginMc from "@/views/MC/LoginMc.vue";

import Home from "@/views/PC/Home.vue";
import HomeMc from "@/views/MC/HomeMc.vue";

import Register from "@/views/PC/Register.vue";
import RegisterMC from "@/views/MC/Register.vue";

// PC
import Useradmi from "@/views/PC/home/shop.vue";
import Bulletin from "@/views/PC/home/bulletin.vue";
import UserStatistics from "@/views/PC/home/userStatistics.vue";
import Role from "@/views/PC/home/role.vue";

import Isauseradmi from "@/views/PC/home/isauseradmi.vue";
import Isabulletin from "@/views/PC/home/isabulletin.vue";
import swiperLxt from "@/views/PC/home/swiperLxt.vue";

// MC
import UseradmiMC from "@/views/MC/home/shop.vue";
import BulletinMC from "@/views/MC/home/bulletin.vue";
import UserStatisticsMC from "@/views/MC/home/userStatistics.vue";
import RoleMC from "@/views/MC/home/role.vue";

import IsauseradmiMC from "@/views/MC/home/isauseradmi.vue";
import IsabulletinMC from "@/views/MC/home/isabulletin.vue";
import swiperLxtMC from "@/views/MC/home/swiperLxt.vue";

Vue.use(Router);
const routes = [
  // {//楼层
  //   path: '/',
  //   name: 'Loucheng',
  //   component: Loucheng
  // }
  {
    path: "/home",
    name: "Home",
    component: isMc(HomeMc, Home),
    children: [
      {
        path: "/home",
        redirect: "/home/shop"
      },
      {
        path: "/home/shop",
        name: "shop",
        component: isMc(UseradmiMC, Useradmi)
      },
      {
        path: "/home/bulletin",
        name: "bulletin",
        component: isMc(BulletinMC, Bulletin)
      },
      {
        path: "/home/userStatistics",
        name: "userStatistics",
        component: isMc(UserStatisticsMC, UserStatistics)
      },
      {
        path: "/home/role",
        name: "role",
        component: isMc(RoleMC, Role)
      },
      {
        path: "/home/isauseradmi",
        name: "isauseradmi",
        component: isMc(IsauseradmiMC, Isauseradmi)
      },
      {
        path: "/home/isabulletin",
        name: "isabulletin",
        component: isMc(IsabulletinMC, Isabulletin)
      },
      {
        path: "/home/swiperLxt",
        name: "swiperLxt",
        component: isMc(swiperLxtMC,swiperLxt)
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: isMc(LoginMc, Login)
  },
  {
    path: "/register",
    name: "register",
    component: isMc(RegisterMC, Register)
  },
  {
    path: "/",
    redirect: "/home"
  }
];

const router = new Router({
  routes
});
export default router;
