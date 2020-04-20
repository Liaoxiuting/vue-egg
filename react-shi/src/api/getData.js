import axios from 'axios'
export default function(next){
    axios.get('/app').then(({data})=>{
        next({type:"ADD",data})
    })
}