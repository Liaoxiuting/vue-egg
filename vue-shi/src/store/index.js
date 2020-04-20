import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        data:[],
        detailData:[],
        count:1,
        zong:0
    },
    actions:{
        getArr({commit}){
            axios.get('/list').then(({data})=>{
                commit('getFn',data)
            })
        },
        detailFn({commit},id){
            axios.get('/detail',{
                params:{
                    id
                }
            }).then(({data})=>{
                // console.log(data,'res')
                commit('detail',data)
            })
        },
        addData({state,commit},name){
            axios.get('/add',{
                params:{obj:name}
            }).then(({data})=>{
                console.log(data)
                console.log(state.count)
                console.log(state.idFn)
                commit('getFn',data)
            })
        },
        sanData({commit},id){
            console.log(id)
            axios.get('/san',{
                params:{id}
            }).then(({data})=>{
                commit('getFn',data)
            })
        }
    },
    mutations:{
        getFn(state,data){
            state.data=data
        },
        detail(state,data){
            state.detailData=data
        },
        jiaFn(state,id){
            let ind=state.data.findIndex(v=>v.id==id)
            state.data[ind].count++
            state.data[ind].falg=true
        },
        jianFn(state,id){
            let ind=state.data.findIndex(v=>v.id==id)
            if (state.data[ind].count>0) {
            state.data[ind].count--
            }else{
                state.data[ind].count=0
                state.data[ind].falg=false
            }
        },
        sanFn(state,id){
            let ind=state.data.findIndex(v=>v.id===id)
            state.data.splice(ind,1)
            console.log(state.data)
        }
    },
    getters:{
        idFn:(state)=>{
           return state.data.reduce((a,b)=>{
               return a+b.id
           },0)
        },
        zongFn(state){
            return state.data.reduce((a,b)=>{
                if (b.falg) {
                    a+=b.count*b.many
                }
                // console.log(a,'a')
                return a
            },0)
        }
    }
})