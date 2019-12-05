<template>
    <div class="login">
        <div class="login_form">
            <el-form 
            :label-position="labelPosition" 
            label-width="80px" 
            :model="formLabelAlign"
            >
                <el-form-item label="用户名">
                    <el-input v-model="formLabelAlign.name"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="formLabelAlign.phone"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :plain="true" @click="onSubmit">登录</el-button>
                </el-form-item>
            </el-form>
                
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    props:{

    },
    components:{

    },
    data(){
        return {
        labelPosition: 'right',
        formLabelAlign: {
          name: '',
          phone: ''
        }
        }
    },
    computed:{

    },
    methods:{
        onSubmit() {
            let nameFalg=this.formLabelAlign.name.length===0;
            let phoneFalg=this.formLabelAlign.phone.length===0;
            if (nameFalg||phoneFalg) {
                this.$message(nameFalg?'请输入账号':'请输入密码');
            }else{
                if (!/^1(3|5|7|8)\d{9}$/.test(this.formLabelAlign.phone)) {
                    this.$message('手机输入格式不正确');
                }else{
                    console.log('user',this.formLabelAlign.name,'phone',this.formLabelAlign.phone)
                    axios.post('http://127.0.0.1:7001/login',{
                        user:this.formLabelAlign.name,
                        phone:this.formLabelAlign.phone
                    }).then(({data})=>{
                        console.log(data,'data')
                        if (data.code==1) {
                            this.$router.push('/home')
                        }
                    })
                }
            }
        }
    },
    created(){

    },
    mounted(){

    }
}
</script>
<style scoped lang="">
.login{
    width: 100%;
    height: 100%;
    /* background: url(https://img.kaikeba.com/11656150219102qcla.jpg) no-repeat; */
    background: url(https://img.kaikeba.com/24856150219102jkiy.jpg) no-repeat center;
    /* background-size: 100% 100%; */
    position: relative;
}
.login_form{
    width: 9rem;
    height: 6rem;
    background-image: linear-gradient(top right,#88888f,#110f0f);
    position: absolute;
    top: 19%;
    left: 30%;
    flex-direction: column;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0px 0px 10px #d6d1d1;
    border-radius: 0.5rem;
}
</style>