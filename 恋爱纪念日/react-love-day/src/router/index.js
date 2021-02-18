import Love from "../view/love.jsx";
import LoveDay from "../view/LoveDay/index.jsx";
// import Detail from "../views/Detail";
// import One from "../components/Love/One";
const routes = [
  {
    path: "/",
    redirect: "/Love",
  },
  {
    path: "/Love",
    component: Love
  },
  {
    path: "/loveday",
    component: LoveDay,
    children: [
      //  {path:'/Love/One',component:One},
      //  {path:"/Love",redirect:"/Love/One"}
    ],
  },
  //  {
  //    path:"/Detail/:id",
  //    component:Detail
  //   }
];
export default routes;
