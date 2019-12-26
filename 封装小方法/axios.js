import axios from "axios";
import { getToken } from "./tokencookie.js";
import { Message } from 'element-ui'
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
    Message({
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
      Message({
        message: error.response.statusText,
        type: 'error',
      });
    }
    return Promise.resolve(error);
  }
);
export default instance;