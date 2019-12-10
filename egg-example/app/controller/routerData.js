const routers = [
  {
    admin: [
      {
        id: "1",
        name: "商品中心",
        children:[
            {
                id: "1a",
                name: "购顺畅",
                url: "/home/useradmi",
            }
        ]
      },
      {
        id: "2",
        name: "系统更新",
        children:[
            {
                id: "2a",
                name: "@系统公告@",
                url: "/home/bulletin",
            }
        ]
      },
      {
        id: "3",
        name: "用户统计",
        children:[
            {
                id: "3a",
                name: "@系统消息@",
                url: "/home/notice",
            }
        ]
      },
      {
        id: "4",
        name: "角色管理",
        children:[
            {
                id: "4a",
                name: "@角色管理@",
                url: "/home/role",
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
        children:[
            {
                id: "1a",
                name: "@用户管理@",
                url: "/home/isauseradmi",
            }
        ]
      },
      {
        id: "2",
        name: "系统公告",
        children:[
            {
                id: "2a",
                name: "@角色管理@",
                url: "/home/isabulletin",
            }
        ]
      }
    ]
  }
];
module.exports = routers;
