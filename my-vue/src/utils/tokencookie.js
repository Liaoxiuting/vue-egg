import Cookie from 'js-cookie';
const key = 'key';
// 获取tokan值
export function getToken(){
    return Cookie.get(key);
};
// 设置token值
export function setToken(val){
    Cookie.set(key, val, { expires: 1 });
};
// 删除token值
export function removeToken(){
    Cookie.remove(key);
};
