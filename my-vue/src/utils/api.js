import axios from "axios";
import { getToken } from "./tokencookie.js";
import { Message } from 'element-ui'
import { Toast } from 'mint-ui';
import { isMobileFlag } from "@/utils/index.js";//判断PC端还是移动端
const instance = axios.create({
  baseURL:"http://127.0.0.1:7001",
  // timeout: 1000,
  // headers: { authorization: getToken() }
});
instance.interceptors.request.use(
  config => {
     const token = getToken();
      // console.log('【二次axios--config】',config)
      if (token) {
        // console.log(token,'cookie--token=--2')
        config.params = {'token': token} //后台接收的参数，后面我们将说明后台如何接收
      }
    return config;
  },
  error => {
    // console.log('【二次axios--error--14',error)
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (response) => {
    // console.log('【二次axios--response',response)
    if (response.status==200) {
    //  alert(response.statusText);
    isMobileFlag()?Toast({
      message: response.statusText,
      position: 'top',
      duration: 5000
    }):Message({
      message: response.statusText,
      type: 'response',
    });
    }
    return response.data;
  },
  error => {
    // console.log('【二次axios--error--27',error)
    if (error.response.status && error.response.status !== 200) {
      // alert(error.response.statusText);
      isMobileFlag()?Toast({
        message: error.response.statusText,
        position: 'top',
        duration: 5000
      }):Message({
        message: error.response.statusText,
        type: 'error',
      });
    }
    return Promise.resolve(error);
  }
);
export default instance;
