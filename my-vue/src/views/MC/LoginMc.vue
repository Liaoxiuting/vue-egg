<template>
  <div class="loginMc">
    <div class="login_form">
          <input v-model="formLabelAlign.name" placeholder="请输入用户名"/>
          <input v-model="formLabelAlign.phone" placeholder="请输入手机号"/>
          <button type="primary" :plain="true" @click="onSubmit">登录</button>
    </div>
  </div>
</template>
<script>
import { loginget } from "@/service/loginget.js";
import { setToken } from "@/utils/tokencookie.js";
import { Toast } from 'mint-ui';
export default {
  props: {},
  components: {},
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {
        name: "",
        phone: ""
      }
    };
  },
  computed: {},
  methods: {
    msgFn(str){//提示信息
        Toast({
            message: str,
            position: 'top',
            duration: 5000
        })
    },
    onSubmit() {
      let nameFalg = this.formLabelAlign.name.length === 0;
      let phoneFalg = this.formLabelAlign.phone.length === 0;
      if (nameFalg || phoneFalg) {
        this.msgFn(nameFalg ? "请输入账号" : "请输入密码");
      } else {
        if (!/^1(3|5|7|8)\d{9}$/.test(this.formLabelAlign.phone)) {
          this.msgFn("手机输入格式不正确");
        } else {
          console.log(
            "user",
            this.formLabelAlign.name,
            "phone",
            this.formLabelAlign.phone
          );
          loginget("/login", {
            user: this.formLabelAlign.name,
            phone: this.formLabelAlign.phone
          })
            .then(data => {
              console.log(data, "data");
              if (data.code === 1) {
                this.msgFn("登录成功");
                setToken(data.token);
                this.$router.push("/home");
              } else {
                this.msgFn("登录失败，请重新登录");
                this.$router.push("/register");
              }
            })
            .catch(res => {
              console.log(res, "res");
            });
        }
      }
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped lang="less">
.loginMc {
  width: 100%;
  height: 100%;
  background: url(https://img.kaikeba.com/91017191219102iryx.jpg) no-repeat;
  background-size: 100% 100%;
  position: relative;
  .login_form {
    width: 90%;
    height: 5rem;
    position: absolute;
    bottom: 10%;
    left:50%;
    transform: translate(-50%);
    flex-direction: column;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0px 0px 10px #d6d1d1;
    border-radius: 0.5rem;
    // background-image: linear-gradient(top right, #88888f, #110f0f);
    input{
        width: 80%;
        height: 0.8rem;
        border-radius: 0.5rem;
        outline-style: none;
        border:0;
        padding-left: 0.3rem;
    }
    button{
        width: 50%;
        height: 0.8rem;
        border-radius: 0.5rem;
        outline-style: none;
        border:0;
    }
  }
}
</style>