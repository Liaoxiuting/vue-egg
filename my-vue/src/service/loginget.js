import request from '@/utils/api.js'
export function loginget(url,obj){
    return request.post(url,obj)
}