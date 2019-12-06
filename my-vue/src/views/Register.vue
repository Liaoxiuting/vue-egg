<template>
    <div class="register">
        <div class="register_form">
            <el-form 
            :label-position="labelPosition" 
            label-width="80px" 
            :model="formLabelAlign"
            >
                <el-form-item label="用户名">
                    <el-input v-model="formLabelAlign.name"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="formLabelAlign.phone"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :plain="true" @click="onSubmit">注册</el-button>
                </el-form-item>
                
            </el-form>
                
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import {registerget} from '@/service/loginget.js'
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
                    registerget('/register',{
                        user:this.formLabelAlign.name,
                        phone:this.formLabelAlign.phone
                    }).then((data)=>{
                        console.log(data,'data')
                        if (data.code===1) {
                            this.$message('注册成功');
                            this.$router.push('/login')
                        }else{
                            this.$message('注册失败，请重新注册');
                        }
                    }).catch((res)=>{
                        console.log(res,'res')
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
.register{
    width: 100%;
    height: 100%;
    background: url(https://img.kaikeba.com/41356150219102dbgj.jpg) no-repeat center;
    position: relative;
}
.register_form{
    width: 9rem;
    height: 6rem;
    background-image: linear-gradient(#d8e780, #df9423);
    position: absolute;
    bottom: 20%;
    right: 10%;
    flex-direction: column;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0px 0px 10px #d6d1d1;
    border-radius: 0.5rem;
}
</style>
