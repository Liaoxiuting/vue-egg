<template>
    <div class="home">
        home
    </div>
</template>
<script>
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

    },
    methods:{

    },
    created(){

        
        if (!localStorage.swj) {
        console.log(this.$router.push('/login'))
        }
    },
    mounted(){

    }
}
</script>
<style scoped lang="">

</style>