import Vue from 'vue'
import Router from 'vue-router'
import { setToken ,getToken,removeToken } from '@/utils/tokencookie.js';

//楼层 
// import Loucheng from '@/components/loucheng'

// 购物车
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Register from '@/views/Register.vue'

// home
import Useradmi from '@/views/home/useradmi.vue'
import Bulletin from '@/views/home/bulletin.vue'
import UserStatistics from '@/views/home/userStatistics.vue'
import Role from '@/views/home/role.vue'

import Isauseradmi from '@/views/home/isauseradmi.vue'
import Isabulletin from '@/views/home/isabulletin.vue'

Vue.use(Router)
const routes=[
  // {//楼层 
  //   path: '/',
  //   name: 'Loucheng',
  //   component: Loucheng
  // }
  {
    path:'/home',
    name:'Home',
    component:Home,
    children:[
      {
        path:"/home",
        redirect:'/home/useradmi'
      },
      {
        path:"/home/useradmi",
        name:'useradmi',
        component:Useradmi
      },
      {
        path:"/home/bulletin",
        name:'bulletin',
        component:Bulletin
      },
      {
        path:"/home/userStatistics",
        name:'userStatistics',
        component:UserStatistics
      },
      {
        path:"/home/role",
        name:'role',
        component:Role
      },
      {
        path:"/home/isauseradmi",
        name:'isauseradmi',
        component:Isauseradmi
      },
      {
        path:"/home/isabulletin",
        name:'isabulletin',
        component:Isabulletin
      }
    ]
  },
  {
    path:'/login',
    name:'Login',
    component:Login
  },{
    path:'/register',
    name:'register',
    component:Register
  },{
    path:'/',
    redirect:"/home"
  }
]
 
const router = new Router({
  routes
});
 export default router;