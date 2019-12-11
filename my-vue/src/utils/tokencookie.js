import Cookie from 'js-cookie';
const key = 'key';
export function getToken(){
    return Cookie.get(key);
};

export function setToken(val){
    Cookie.set(key, val, { expires: 1 });
};

export function removeToken(){
    Cookie.remove(key);
};
