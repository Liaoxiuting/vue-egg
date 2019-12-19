import Vue from "vue";
import Vuex from "vuex";
import { getToken } from "@/utils/tokencookie.js";
import { shopingget } from "@/service/loginget.js";
Vue.use(Vuex);
export default {
  namespaced: true,
  state: {
    list:[],
    listOne:[],
    listTwo:[],
    listThree:[],
    listFroo:[]
  },
  mutations: {
    shopIngcommit:(state,data)=>{
        state.list=data
    }
  },
  actions: {
    shopIng: ({ commit }) => {
      if (getToken()) {
        shopingget("/shopgin").then(res => {
         console.log(res,'res')
         commit('shopIngcommit',res)
        });
      }
    }
  }
};
