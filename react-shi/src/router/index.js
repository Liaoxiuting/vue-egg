import Home from "../components/Home";
import Detail from "../views/Detail";
import One from "../components/Home/One";
import Two from "../components/Home/Two";
import Son from "../components/Home/Son";

const routes=[
   {path:"/",redirect:"/Home"},
   {path:"/Home",component:Home,children:[
       {path:'/Home/One',component:One},
       {path:'/Home/Two',component:Two},
       {path:'/Home/Son',component:Son},
       {path:"/Home",redirect:"/Home/One"}
   ]},
   {path:"/Detail/:id",component:Detail}
]
export default routes