import Vue from 'vue'
import Router from 'vue-router'

//楼层 
// import Loucheng from '@/components/loucheng'

// 购物车
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Register from '@/views/Register.vue'


Vue.use(Router)

export default new Router({
  routes: [
    // {//楼层 
    //   path: '/',
    //   name: 'Loucheng',
    //   component: Loucheng
    // }
    {
      path:'/',
      name:'Home',
      component:Home
    },
    {
      path:'/login',
      name:'Login',
      component:Login
    },{
      path:'/register',
      name:'register',
      component:Register
    },
    // beforeEach(to,from,next){
    //   if(to.path == '/login' || to.path == '/register'){
    //     next();
    //   }else{
    //     alert('您还没有登录，请先登录');
    //     next('/login');
    //   }
    // })
  ]
})
