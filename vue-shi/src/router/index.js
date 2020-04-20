import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import detail from '../views/detail.vue'
import add from '../views/add.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path:"/detail/:id",
      component:detail
    },{
      path:"/add",
      component:add
    }
  ]
})
