<template>
    <div class="list">
        <p  @click="$router.push('/detail/'+itm.id)">{{itm.name}}</p>   
        <p  @click="$emit('wsjFn',indx)">{{itm.many}}</p>     
        <p @click="sanFn(itm.id)">
    <!-- <p @click="sanData(itm.id)"> -->
            删除
        </p>
        <p>
            编辑
        </p>
        <span @click="jianFn(itm.id)">
            -
        </span>
        <button>
            {{itm.count}}
        </button>
        <span @click="jiaFn(itm.id)">
            +
        </span>
    </div>
</template>
<script>
import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
export default {
    props:["itm","indx"],
    components:{

    },
    data(){
        return {

        }
    },
    computed:{

    },
    methods:{
        ...mapMutations(['jiaFn','jianFn','sanFn']),
        ...mapActions(['sanData'])
    },
    created(){

    },
    mounted(){

    }
}
</script>
<style scoped lang="">
    
</style>