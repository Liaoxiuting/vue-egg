import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import CarouselComponent from '@/views/CarouselComponent'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        redirect:'/CarouselComponent'
    },{
        path: '/Home',
        name: 'Home',
        component: Home
    },{
        path: '/CarouselComponent',
        name: 'CarouselComponent',
        component: CarouselComponent
    }]
})