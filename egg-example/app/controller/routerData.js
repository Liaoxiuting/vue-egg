const routers = [
  {
    admin: [
      {
        id: "1",
        name: "商品中心",
        children: [
          {
            id: "1a",
            name: "购顺畅",
            url: "/home/shop"
          }
        ]
      },
      {
        id: "2",
        name: "用户管理",
        children: [
          {
            id: "2a",
            name: "@用户统计@",
            url: "/home/userStatistics"
          }
        ]
      },
      {
        id: "3",
        name: "悟生境MAP",
        children: [
          {
            id: "3a",
            name: "@百度地图API@",
            url: "/home/bulletin"
          }
        ]
      },
      {
        id: "4",
        name: "Echarts",
        children: [
          {
            id: "4a",
            name: "@echarts@",
            url: "/home/role"
          }
        ]
      },{
        id: "5",
        name: "swiperLxt",
        children: [
          {
            id: "5a",
            name: "@swiperLxt@",
            url: "/home/swiperLxt"
          }
        ]
      }
    ]
  },
  {
    user: [
      {
        id: "1",
        name: "个人管理",
        children: [
          {
            id: "1a",
            name: "@用户管理@",
            url: "/home/isauseradmi"
          }
        ]
      },
      {
        id: "2",
        name: "Echarts",
        children: [
          {
            id: "2a",
            name: "@echarts@",
            url: "/home/isabulletin"
          }
        ]
      }
    ]
  }
];
module.exports = routers;
