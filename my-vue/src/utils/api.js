import axios from "axios";
// import { getToken } from "./index";
import { Message } from 'element-ui'
const instance = axios.create({
  baseURL:"http://127.0.0.1:7001",
  // timeout: 1000,
  // headers: { authorization: getToken() }
});
instance.interceptors.request.use(
  config => {
      console.log('【二次axios--config】')
    return config;
  },
  error => {
    console.log('【二次axios--error--14')
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (response) => {
    console.log('【二次axios--response')
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
    console.log('【二次axios--error--27')
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
