<template>
    <div>
        <p v-for="itm in detailData" :key="itm.id">
            {{itm.name}}
        </p>
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

        }
    },
    computed:{
        ...mapState(['detailData'])
    },
    methods:{
        ...mapActions(['detailFn'])
    },
    created(){
        // console.log(this.$route.params.id)
        this.detailFn(this.$route.params.id)
    },
    mounted(){

    }
}
</script>
<style scoped lang="">

</style>