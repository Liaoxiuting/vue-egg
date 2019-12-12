import Vue from 'vue'
import Vuex from 'vuex'
import {userStatistics} from '@/service/loginget.js'
Vue.use(Vuex)
export default {
    namespaced:true,
    state:{
        list:[1,2,3]
    },
    mutations:{
        userStatisticsFnList(state,res){
            res.forEach(v=>{
                // 将时间戳 转化为 日期
                
                let str=new Date(parseInt(v.date)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " "); 
                v.date=str
            })
            state.list=res
        }
    },
    actions:{
        userStatisticsFn({commit},url){
            userStatistics(url).then(res=>{
                console.log(res,'res--')
                if (res.code==1) {
                    
                commit('userStatisticsFnList',res.data)
                }
            })
        }
    }
}