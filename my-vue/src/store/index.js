import Vue from 'vue';
import Vuex from 'vuex';
import zhuan from './zhuan.js'
Vue.use(Vuex);

const store= new Vuex.Store({
    modules:{
        zhuan
    }
})
export default store;