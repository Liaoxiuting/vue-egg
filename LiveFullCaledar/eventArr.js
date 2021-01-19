let eventsArr = [
  {
    id: 21411,
    title: '算法数据',
    start: '2021-01-01 06:20:00',
    teacher: '福克斯',
    titleText: '产品经理年底复盘与新年flag',
    text: '下周三提测、1月26上线',
    end: '2021-01-01 16:00:00',
    className: 'greenColorThan'
  },
  {
    id: 112412,
    title: '算法数据',
    start: '2021-01-07',
    teacher: '福克斯',
    titleText: '产品经理年底复盘与新年flag',
    text: '下周三提测、1月26上线',
    className: 'greenColorThan'
  },
  {
    id: 112412131,
    title: '产品经理年底复盘',
    start: '2021-01-08',
    teacher: '福克斯',
    titleText: '产品经理年底复盘与新年flag',
    end: '2021-01-11T16:00:00',
    text: '下周三提测、1月26上线',
    className: 'blueColorThan'
  },
  // {
  //   id: 11241213123131,
  //   title: '产品经理年底复盘',
  //   start: '2021-01-09',
  // teacher:'福克斯',//
  // titleText: '产品经理年底复盘与新年flag',
  //   text: '下周三提测、1月26上线',
  //   className: 'blueColor'
  // },
  {
    id: 131312,
    title: '产品经理年底复盘',
    start: '2021-01-09',
    teacher: '福克斯',
    titleText: '产品经理年底复盘与新年flag',
    text: '下周三提测、1月26上线',
    className: 'blueColorThan'
  },
  {
    id: 12345,
    title: 'Web前端高级工程师',
    start: '2021-01-09T16:00:00',
    teacher: '福克斯',
    titleText: '产品经理年底复盘与新年flag',
    text: '下周三提测、1月26上线',
    className: 'yellowColorThan'
  },
  {
    id: 16645,
    title: 'Web前端高级工程师',
    start: '2021-01-16T16:00:00',
    teacher: '福克斯',
    titleText: '产品经理年底复盘与新年flag',
    text: '下周三提测、1月26上线',
    className: 'yellowColorThan'
  },
  {
    id: 18888888,
    title: '数据分析与增长黑客',
    start: '2021-01-11',
    teacher: '福克斯',
    titleText: '产品经理年底复盘与新年flag',
    text: '下周三提测、1月26上线',
    className: 'orangeColorThan'
  },
  {
    id: 19,
    title: '数据分析与增长黑客',
    start: '2021-01-15T10:30:00',
    teacher: '福克斯',
    titleText: '产品经理年底复盘与新年flag',
    text: '下周三提测、1月26上线',
    className: 'orangeColorThan'
  },
  {
    id: 10,
    title: '交互设计',
    start: '2021-01-15T12:00:00',
    teacher: '福克斯',
    titleText: '产品经理年底复盘与新年flag',
    text: '下周三提测、1月26上线',
    className: 'violetColorThan'
  },
  {
    id: 1159859901,
    // color: '#0AD893',
    titleText: '产品经理年底复盘与新年flag', //
    textColor: '#fff',
    title: '交互设计',
    start: '2021-01-15T01:30:00',
    teacher: '福克斯',
    text: '下周三提测、1月26上线',
    className: 'violetColorThan'
  },
  {
    id: 15365735,
    title: '产品经理年底复盘',
    start: '2021-01-15T17:00:00',
    teacher: '福克斯',
    titleText: '产品经理年底复盘与新年flag',
    text: '下周三提测、1月26上线',
    end: '2021-01-15T19:00:00',
    className: 'wathetColorThan'
  },
  {
    id: 1765373,
    title: '产品经理年底复盘',
    start: '2021-01-15T07:00:00',
    teacher: '福克斯',
    titleText: '产品经理年底复盘与新年flag',
    text: '下周三提测、1月26上线',
    className: 'BlueCyanColorThan'
  },
  {
    id: 1758674,
    title: '产品经理年底复盘',
    // url: 'http://google.com/',
    start: '2021-01-28',
    teacher: '福克斯',
    titleText: '产品经理年底复盘与新年flag',
    text: '下周三提测、1月26上线',
    className: 'BlueCyanColorThan'
  },
  {
    id: 196875,
    title: '产品经理年底复盘',
    start: '2021-01-15T07:00:00',
    teacher: '福克斯',
    titleText: '产品经理年底复盘与新年flag',
    text: '下周三提测、1月26上线',
    className: 'CyanColorThan'
  },
  {
    id: 123564,
    title: '产品经理年底复盘',
    start: '2021-01-15T07:00:00',
    teacher: '福克斯',
    titleText: '产品经理年底复盘与新年flag',
    text: '下周三提测、1月26上线',
    className: 'CyanColorThan'
  },
  {
    id: 1356758855,
    title: 'Web前端高级工程师的',
    start: '2021-01-15T07:00:00',
    teacher: '福克斯',
    titleText: '产品经理年底复盘与新年flag',
    text: '下周三提测、1月26上线',
    className: 'YellowOrangeColorThan'
  },
  {
    id: 13753875,
    title: 'Web前端高级工程师的',
    start: '2021-01-15T07:00:00',
    teacher: '福克斯',
    titleText: '产品经理年底复盘与新年flag',
    text: '下周三提测、1月26上线',
    className: 'YellowOrangeColorThan'
  },
  {
    id: 1377575,
    title: 'Web前端高级工程师的',
    start: '2021-01-15T07:00:00',
    teacher: '福克斯',
    titleText: '产品经理年底复盘与新年flag',
    text: '下周三提测、1月26上线',
    className: 'PinkColorThan'
  },
  {
    id: 18484,
    title: 'Web前端高级工程师的',
    start: '2021-01-15T07:00:00',
    teacher: '福克斯',
    titleText: '产品经理年底复盘与新年flag',
    text: '下周三提测、1月26上线',
    className: 'PinkColorThan'
  },
  {
    id: 186848,
    title: 'Web前端高级工程师的',
    start: '2021-01-15T07:00:00',
    teacher: '福克斯',
    titleText: '产品经理年底复盘与新年flag',
    text: '下周三提测、1月26上线',
    className: 'PinkRedColorThan'
  },
  {
    id: 1648684,
    title: 'Web前端高级工程师的',
    start: '2021-01-15T07:00:00',
    teacher: '福克斯',
    titleText: '产品经理年底复盘与新年flag',
    text: '下周三提测、1月26上线',
    className: 'PinkRedColorThan'
  },
  {
    id: 196786896786,
    title: 'Web前端高级工程师的',
    start: '2021-01-15T07:00:00',
    teacher: '福克斯',
    titleText: '产品经理年底复盘与新年flag',
    text: '下周三提测、1月26上线',
    className: 'violetRedColorThan'
  },
  {
    id: 167868467,
    title: '大数据分析',
    start: '2021-01-15T07:00:00',
    teacher: '福克斯',
    titleText: '产品经理年底复盘与新年flag',
    text: '下周三提测、1月26上线',
    className: 'violetRedColorThan'
  },
  {
    id: 16856868,
    title: '大数据分析',
    start: '2021-01-15T07:00:00',
    teacher: '福克斯',
    titleText: '产品经理年底复盘与新年flag',
    text: '下周三提测、1月26上线',
    className: 'violetBlueColorThan'
  },
  {
    id: 17,
    title: '大数据分析',
    start: '2021-01-17T07:00:00',
    teacher: '福克斯',
    titleText: '产品经理年底复盘与新年flag',
    text: '下周三提测、1月26上线',
    className: 'greyColorThan'
  },
  {
    id: 167457567567665464264543,
    title: '产品思维',
    start: '2020-12-29T07:00:00',
    teacher: '福克斯',
    titleText: '产品经理年底复盘与新年flag',
    text: '下周三提测、1月26上线',
    className: 'greyColorThan'
  },
  {
    id: 1345646464646465,
    title: '产品思维',
    start: '2020-12-29T07:00:00',
    teacher: '福克斯',
    titleText: '产品经理年底复盘与新年flag',
    text: '下周三提测、1月26上线',
    className: 'greyColorThan'
  },
  {
    id: 1846456543684,
    title: '算法数据',
    start: '2020-12-29T07:00:00',
    teacher: '福克斯',
    titleText: '产品经理年底复盘新年flag',
    text: '下周三提测、1月26上线',
    className: 'PinkColorThan'
  },
  {
    id: 1865643564364643848,
    title: '算法数据',
    start: '2020-12-29T07:00:00',
    teacher: '福克斯',
    titleText: '产品经理年底复盘与新年flag',
    text: '下周三提测、1月26上线',
    className: 'PinkRedColorThan'
  },
  {
    id: 19654646456875,
    title: '产品经理年底复盘',
    start: '2021-01-29T07:00:00',
    teacher: '福克斯',
    titleText: '产品经理年底复盘与新年flag',
    text: '下周三提测、1月26上线',
    className: 'CyanColorThan'
  },
  {
    id: 124532543663564,
    title: '产品经理年底复盘',
    start: '2021-01-29T07:00:00',
    teacher: '福克斯',
    titleText: '产品经理年底复盘与新年flag',
    text: '下周三提测、1月26上线',
    className: 'CyanColorThan'
  },
  {
    id: 135345325236758855,
    title: 'Web前端高级工程师的',
    start: '2021-01-29T07:00:00',
    teacher: '福克斯',
    titleText: '产品经理年底复盘与新年flag',
    text: '下周三提测、1月26上线',
    className: 'YellowOrangeColorThan'
  },
  {
    id: 137534523532523875,
    title: 'Web前端高级工程师的',
    start: '2021-01-29T07:00:00',
    teacher: '福克斯',
    titleText: '产品经理年底复盘与新年flag',
    text: '下周三提测、1月26上线',
    className: 'YellowOrangeColorThan'
  },
  {
    id: 137753253253535575,
    title: 'Web前端高级工程师的',
    start: '2021-01-29T07:00:00',
    teacher: '福克斯',
    titleText: '产品经理年底复盘与新年flag',
    text: '下周三提测、1月26上线',
    className: 'PinkColorThan'
  },
  {
    id: 18434534584,
    title: 'Web前端高级工程师的',
    start: '2021-01-29T07:00:00',
    teacher: '福克斯',
    titleText: '产品经理年底复盘与新年flag',
    text: '下周三提测、1月26上线',
    className: 'PinkColorThan'
  },
  {
    id: 18612353535848,
    title: 'Web前端高级工程师的',
    start: '2021-01-29T07:00:00',
    teacher: '福克斯',
    titleText: '产品经理年底复盘与新年flag',
    text: '下周三提测、1月26上线',
    className: 'PinkRedColorThan'
  },
  {
    id: 16487654684,
    title: 'Web前端高级工程师的',
    start: '2021-01-29T07:00:00',
    teacher: '福克斯',
    titleText: '产品经理年底复盘与新年flag',
    text: '下周三提测、1月26上线',
    className: 'PinkRedColorThan'
  },
  {
    id: 1967868923456786,
    title: 'Web前端高级工程师的',
    start: '2021-01-29T07:00:00',
    teacher: '福克斯',
    titleText: '产品经理年底复盘与新年flag',
    text: '下周三提测、1月26上线',
    className: 'violetRedColorThan'
  },
  {
    id: 167865468467,
    title: '大数据分析',
    start: '2021-01-29T07:00:00',
    teacher: '福克斯',
    titleText: '产品经理年底复盘与新年flag',
    text: '下周三提测、1月26上线',
    className: 'violetRedColorThan'
  },
  {
    id: 164567765856868,
    title: '大数据分析',
    start: '2021-01-29T07:00:00',
    teacher: '福克斯',
    titleText: '产品经理年底复盘与新年flag',
    text: '下周三提测、1月26上线',
    className: 'violetBlueColorThan'
  }
]
export default eventsArr