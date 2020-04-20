import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

let reduceOne = function (state = localStorage.data ? JSON.parse(localStorage.data) : [], action) {
    // let newstate=JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case "ADD":
            // console.log(action.data)
            state = action.data
            localStorage.data = JSON.stringify(state)
            return state;
        case "GAI":
            // console.log(action.obj.id,state)
           let ind= state.findIndex(v=>v.id==action.obj.id,state)
        //    console.log(ind,'ind')
           state.splice(ind,1,action.obj)
           localStorage.data = JSON.stringify(state)
            return state;
        default:
            return state;
    }
}

let Reducers = combineReducers({ reduceOne })
let store = createStore(Reducers, applyMiddleware(thunk))
export default store