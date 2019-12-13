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
        //获取用户信息
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
        //获取用户信息
        userStatisticsFn({commit},url){
            userStatistics(url).then(res=>{
                console.log(res,'res--')
                if (res.code==1) {
                commit('userStatisticsFnList',res.data)
                }
            })
        },

        // 删除当前用户
        deleteRow({commit},obj){
            console.log(obj,'obj')
            deleteRowFn('/userstatistics/deleterow',obj).then((res)=>{
                if (res.code==1) {
                    commit('userStatisticsFnList',res.data)
                }
            })
        },
        
        // 修改当前用户
        modifyRow({commit},obj){
            modifyRowFn('/userstatistics/modifyrow',obj).then((res)=>{
                if (res.code==1) {
                    commit('userStatisticsFnList',res.data)
                }
            })
        }

    }
}