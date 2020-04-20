<template>
    <div>
        <input type="text" v-model="name">
        <button @click="vlaueFn">
            添加{{idFn}}
        </button>
    </div>
</template>
<script>
import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
export default {
    props:{

    },
    components:{

    },
    data(){
        return {
            name:'超级英雄狂想曲'
        }
    },
    computed:{
        ...mapGetters(['idFn'])
    },
    methods:{
        ...mapActions(['addData']),

        vlaueFn(){
            console.log(this.name)
            // id=this.count++
            console.log(this.idFn)
            // {name:this.name,id:'lxt'+id}
            this.addData({name:this.name,id:this.idFn,count:0,many:111,falg:false})
            // this.count=id
        }
    },
    created(){

    },
    mounted(){

    }
}
</script>
<style scoped lang="">

</style>