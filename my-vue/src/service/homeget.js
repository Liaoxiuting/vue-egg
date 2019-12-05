import request from '../utils/api'
export let  homeget = () =>{
    console.log(request,'request------')
    return request.get('/')
}