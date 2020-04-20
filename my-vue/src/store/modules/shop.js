import Vue from "vue";
import Vuex from "vuex";
import { getToken } from "@/utils/tokencookie.js";
import { shopingget } from "@/service/loginget.js";
import { addshop } from "@/service/shop.js";
Vue.use(Vuex);
export default {
  namespaced: true,
  state: {
    list: [],
    listOne: [],
    listTwo: [],
    listThree: [],
    listFroo: []
  },
  getters:{
    gesuFn:(state)=>{
      return state.list.reduce((a,b)=>{
        return a+Number(b.conts)
      },0)
    },
    zongFn:(state)=>{
      return state.list.reduce((a,b)=>{
          if (b.conts!=0) {
            a+=Number(b.many)*Number(b.conts).toFixed(2)
          }
          // return (a.toFixed(1))
          // return parseInt(a)//取整
          return a//小数点
      },0)
    }
  },
  mutations: {
    shopIngcommit: (state, data) => {
      state.list = data;
    },
    addFn(state,id){
      let ind=state.list.findIndex(v=>v.id==id)
      ++state.list[ind].conts
        addshop("/addshoping", {
          id,conts:state.list[ind].conts
        }).then((res) => {
          console.log(res,'res')
        });
    },
    romeFn(state,id){
      let ind=state.list.findIndex(v=>v.id==id)
      if (state.list[ind].conts>0) {
        --state.list[ind].conts;
        addshop("/addshoping", {
          id,conts:state.list[ind].conts
        }).then((res) => {
          console.log(res,'res')
        });
      }
    }
  },
  actions: {
    shopIng: ({ commit }) => {
      if (getToken()) {
        shopingget("/shopgin").then(({data}) => {
          if (data.length!=0) {
            commit("shopIngcommit", data);
          }
        });
      }
    }
  }
};
