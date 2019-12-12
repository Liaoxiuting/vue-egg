import request from '@/utils/api.js'
// 登录 注册
export function loginget(url,obj){
    return request.post(url,obj)
}
// 注册
export function registerget(url,obj){
    return request.post(url,obj)
}
// 首页
export function homeget(url,params){
    return request.get(url,{
        headers:{params},
        params:{params}
    })
}
// 购物 商品 数据
export function shopingget(url){
    return request.get(url)
}
// 用户 数据
export function userStatistics(url){
    return request.get(url)
}
