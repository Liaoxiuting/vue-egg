import Vue from 'vue'
import Vuex from 'vuex'
import {userStatistics,deleteRowFn,modifyRowFn} from '@/service/loginget.js'
Vue.use(Vuex)
export default {
    namespaced:true,
    state:{
        list:[1,2,3]
    },
    mutations:{
    },
    actions:{

    }
}