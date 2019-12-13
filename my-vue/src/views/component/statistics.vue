<template>
    <div class="statistics">
        <div class="statistics_son">
            <h3>角色</h3>
            <p>{{obj.role=='admin'?'管理者':'员工'}}</p>
            <h3>姓名</h3>
            <input type="text" value="fullnames" v-model="obj.user">
            <h3>签名</h3>
            <input type="text" value="phones" v-model="obj.texts">
            <h3>头像</h3>
            <input type="text" value="imgss" v-model="obj.imgs">
            <div class='statistics_son_btn'>
                <button @click="clickFn('no')">取消</button>
                <button @click="clickFn('ok')">确认</button>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    props:['statisticsObj'],
    components:{

    },
    data(){
        return {
            obj:null
        }
    },
    computed:{

    },
    methods:{   
        ...mapActions('useradmi',['modifyRow']),
        clickFn(str){
            if(str=="ok"){
                if (this.obj.user&&this.obj.texts) {
                    let obj={
                        id:this.obj.id,
                        user:this.obj.user,
                        texts:this.obj.texts,
                        imgs:this.obj.imgs
                    }
                    this.modifyRow(obj)
                }
                this.$emit('Falg',false)
            }
            this.$emit('Falg',false)
        }
    },
    created(){
        this.obj=this.statisticsObj
    },
    mounted(){

    }
}
</script>
<style scoped lang="less">
.flex(@space){
    display: flex;
    justify-content:@space;
    align-items: center;
}
.direction(@column,@space){
    flex-direction: @column;
    display: flex;
    justify-content:@space;
    align-items: center;
}
.statistics{
    width: 100%;
    height:100%;
    background: rgba(0, 0 ,0,0.5);
    position: fixed;
    top: 0;
    left: 0;
    .flex(space-around);
    .statistics_son{
        width: 11rem;
        height: 7rem;
        background: #fff;
        border-radius: 0.3rem;
        .direction(column,space-around);
        h3{
            color: #000;
            width: 100%;
            height: 0.5rem;
            line-height: 0.5rem;
        }
        p{
            color: darksalmon;
            width: 100%;
            height: 0.5rem;
            line-height: 0.5rem;
            font-size: 0.32rem;
            font-weight: bold;
        }
        input{
            
            width: 70%;
            height: 0.6rem;
            border-radius: 0.3rem;
            border: 0.01rem solid #ccc;
            outline-style: none;
            padding-left: 0.5rem;
        }
        .statistics_son_btn{
            width: 80%;
            height: 0.8rem;
            .flex(space-around);
            button{
                width: 1.5rem;
                height: 0.5rem;
                border-radius: 0.1rem;
                border: 0.01rem solid #ccc;
                outline-style: none;
            }
        }
    }
}
</style>