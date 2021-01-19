<template>
  <!--  -->
  <div class="LiveFullCaledar">
    <div class="LiveFullCaledar_pading">
      <div class="LiveFullCaledar_son">
        <div class="LiveFullCaledar_son_header">
          <p>{{ dateText.year }}年{{ numberTen(dateText.month+1) }}月</p>
          <button @click="prevClick">
            <img src="https://img.kaikeba.com/a/45821191101202enpz.png" alt="">
          </button>
          <button @click="nextClick">
            <img src="https://img.kaikeba.com/a/82921191101202xaov.png" alt="">
          </button>
          <button class="header_today" @click="todayClick">今天</button>
        </div>
        <div class="checkoutBox">
          <div
            v-for="(item,index) in checkoutBoxArr"
            :key="index"
            :class="['checkoutBox_son',checkoutChoiceArrIndexOf(item.text)===-1?'':item.classNameOne]"
            @click="CheckoutBoxFunction(item)"
          >
            {{ item.text }}
            <i :class="['ivu-icon', 'ivu-icon-checkmark','checkoutBox_son_choice',checkoutChoiceArrIndexOf(item.text)===-1?'':item.classNameTwo]">
              <!-- <img src="https://img.kaikeba.com/a/84031191101202rbpl.png" alt=""> -->
              <img src="https://img.kaikeba.com/a/94131191101202ejrz.png" alt="">
            </i>
          </div>
        </div>

        <FullCalendar
          id="FullCalendar"
          ref="fullCalendar"
          defaultView="dayGridMonth"
          locale="zh-cn"
          height="auto"
          :header="false"
          :weekNumbersWithinDays="true"
          :initialView="initialView"
          :buttonText="buttonText"
          :plugins="calendarPlugins"
          :weekends="calendarWeekends"
          :events="calendarEvents"
          :eventLimit="4"
          :eventLimitText="eventLimitText"
          @dateClick="handleDateClick"
          @eventClick="handleEventClick"
          @changeMonth="changeMonth"
        />
      </div>
    </div>
    <div
      v-show="tanKuangFlag"
      id="tanKuang"
    >
      <div class="tanKuang_son">
        <div class="tanKuang_nav">
          <p>
            {{ tanKuangDate.month }}.{{ tanKuangDate.day }} {{ tanKuangDate.start }}-{{ tanKuangDate.end }}
          </p>
          <span @click="tanKuangShow(false)">X</span>
        </div>
        <div class="tankuang_title_text">
          <p class="tankuang_title">{{ tanKuangDate.titleText }}</p>
          <p class="tankuang_text">{{ tanKuangDate.text }}</p>
        </div>
        <div class="tankuang_img_btn">
          <div class="img_btn_left">
            <img src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1710884549,1871927430&fm=115&gp=0.jpg" alt=""><p> {{ tanKuangDate.teacher }} </p>
          </div>
          <div class="img_btn_right">
            看直播
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
// :dayNamesShort="['周日','周一','周二','周三','周四','周五','周六']"
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import eventsArr from './eventArr.js'
let eventsarr = eventsArr
export default {
  name: 'LiveFullCaledar',
  components: {
    FullCalendar
  },
  data() {
    return {
      tanKuangDate: {
        year: '',
        month: '',
        day: '',
        start: '',
        end: '',
        titleText: '',
        text: ''
      },
      tankuangTop: 0,
      tankuangLeft: 0,
      dateText: {
        year: '',
        month: '',
        day: ''
      },
      checkoutBoxArr: [{
        text: '算法数据',
        classNameOne: 'greenColorThan',
        classNameTwo: 'greenColor'
      }, {
        text: '产品经理年底复盘',
        classNameOne: 'blueColorThan',
        classNameTwo: 'blueColor'
      }, {
        text: 'Web前端高级工程师',
        classNameOne: 'yellowColorThan',
        classNameTwo: 'yellowColor'
      }, {
        text: '数据分析与增长黑客',
        classNameOne: 'orangeColorThan',
        classNameTwo: 'orangeColor'
      }, {
        text: '交互设计',
        classNameOne: 'violetColorThan',
        classNameTwo: 'violetColor'
      }, {
        text: '产品思维',
        classNameOne: 'greyColorThan',
        classNameTwo: 'greyColor'
      }, {
        text: '大数据分析',
        classNameOne: 'greyColorThan',
        classNameTwo: 'greyColor'
      }],
      checkoutColor: [{
        classNameOne: 'greenColorThan',
        classNameTwo: 'greenColor'
      }, {
        classNameOne: 'blueColorThan',
        classNameTwo: 'blueColor'
      }, {
        classNameOne: 'yellowColorThan',
        classNameTwo: 'yellowColor'
      }, {
        classNameOne: 'orangeColorThan',
        classNameTwo: 'orangeColor'
      }, {
        classNameOne: 'violetColorThan',
        classNameTwo: 'violetColor'
      }, {
        classNameOne: 'ShecolorColorThan',
        classNameTwo: 'ShecolorColor'
      }, {
        classNameOne: 'wathetColorThan',
        classNameTwo: 'wathetColor'
      }, {
        classNameOne: 'YellowOrangeColorThan',
        classNameTwo: 'YellowOrangeColor'
      }, {
        classNameOne: 'BlueCyanColorThan',
        classNameTwo: 'BlueCyanColor'
      }, {
        classNameOne: 'CyanColorThan',
        classNameTwo: 'CyanColor'
      }, {
        classNameOne: 'PinkColorThan',
        classNameTwo: 'PinkColor'
      }, {
        classNameOne: 'PinkRedColorThan',
        classNameTwo: 'PinkRedColor'
      }, {
        classNameOne: 'violetRedColorThan',
        classNameTwo: 'violetRedColor'
      }, {
        classNameOne: 'violetBlueColorThan',
        classNameTwo: 'violetBlueColor'
      }, {
        classNameOne: 'violetShecolorColorThan',
        classNameTwo: 'violetShecolorColor'
      }],
      checkoutChoiceArr: [],
      tanKuangFlag: false,
      buttonText: {
        today: '今天',
        month: '月',
        week: '周',
        day: '天',
        list: '列表'
      },
      initialView: 'timeGridDay',
      calendarPlugins: [ // plugins must be defined in the JS
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin // needed for dateClick
      ],
      calendarWeekends: true,
      calendarEvents: [ // initial event data
        ...eventsarr
        // {
        //   title: 'Event Now',
        //   start: new Date(),
        //   color: '#A61000'
        // }
      ],
      calendarApi: null
    }
  },
  created() {
    // console.log(new Date().getDay(), '周')
    // console.log(new Date().getFullYear(), new Date().getMonth())
    this.SetDateText('today')
    this.loopAddColorFunction()
  },
  mounted() {
    this.calendarApi = this.$refs.fullCalendar.getApi()
    this.SetWeekTextColor()
    this.SetDayText()
  },
  methods: {
    loopAddColorFunction() { // 循环添加颜色
      let count = 0
      console.log(this.checkoutColor.length, 'checkoutColor.length')
      this.checkoutBoxArr.forEach((item, index) => {
        if (count === this.checkoutColor.length) {
          count = 0
        } else {
          count++
        }
        this.checkoutBoxArr[index].classNameOne = this.checkoutColor[count].classNameOne
        this.checkoutBoxArr[index].classNameTwo = this.checkoutColor[count].classNameTwo
      })
      this.checkoutBoxArr.forEach((item, index) => {
        eventsarr.forEach((itm, idn) => {
          if (item.text === itm.title) {
            eventsarr[idn].className = item.classNameOne
            eventsarr[idn].classNameTwo = item.classNameTwo
          }
        })
      })
    },
    SetDateText(type) { // 切换 月份 或者 跳转 当月 title显示时间
      switch (type) {
        case 'today':// 今天
          this.dateText.year = new Date().getFullYear()
          this.dateText.month = new Date().getMonth()
          this.dateText.day = new Date().getDate()
          break
        case 'prev':// 上个月
          if (this.dateText.month === 0) {
            this.dateText.year = this.dateText.year - 1
            this.dateText.month = 11
            this.dateText.day = 1
          } else {
            this.dateText.month = this.dateText.month - 1
            this.dateText.day = 1
          }
          break
        case 'next':// 下个月
          if (this.dateText.month === 11) {
            this.dateText.year = this.dateText.year + 1
            this.dateText.month = 0
            this.dateText.day = 1
          } else {
            this.dateText.month = this.dateText.month + 1
            this.dateText.day = 1
          }
          break
        default:
          break
      }
    },
    nextClick() { // 下个月切换按钮
      let calendarApi = this.$refs.fullCalendar.getApi()
      calendarApi.next()
      this.SetDateText('next')
      this.SetWeekTextColor()
      this.SetDayText()
    },
    prevClick() { // 上个月切换按钮
      let calendarApi = this.$refs.fullCalendar.getApi()
      calendarApi.prev()
      this.SetDateText('prev')
      this.SetWeekTextColor()
      this.SetDayText()
    },
    todayClick() { // 今天 按钮
      let calendarApi = this.$refs.fullCalendar.getApi()
      // let date = new Date(calendarApi.state.currentDate)
      if (new Date().getFullYear() === this.dateText.year && new Date().getMonth() === this.dateText.month) {
        return
      }
      this.SetDateText('today')
      calendarApi.today()
      this.SetWeekTextColor()
      this.SetDayText()
    },
    CheckoutBoxFunction(item) { // 复选框逻辑1
      this.checkoutChoiceArrSome(item)
      let arr = []
      if (this.checkoutChoiceArr.length > 0) {
        arr = eventsarr.filter((itm, ind) => {
          return this.checkoutChoiceArrIndexOf(itm.title) !== -1
        })
      } else {
        arr = eventsarr
      }
      this.calendarEvents = arr
    },
    checkoutChoiceArrSome(item) { // 复选操作  //复选框逻辑2
      let itemArr = this.checkoutChoiceArr
      let flag = itemArr.some((v, i) => {
        return v === item.text
      })
      if (flag) {
        itemArr.forEach((someItem, someIndex) => {
          if (someItem === item.text) {
            itemArr.splice(someIndex, 1)
          }
        })
      } else {
        itemArr.push(item.text)
      }
      this.checkoutChoiceArr = itemArr
    },
    checkoutChoiceArrIndexOf(str) { // 复选框逻辑3
      return this.checkoutChoiceArr.indexOf(str)
    },
    // 修改每日显示日文字   例：1日 变 1
    SetDayText() {
      let dayTextArr = []
      dayTextArr = document.querySelectorAll('.fc-day-number')
      dayTextArr.forEach(item => {
        let text1 = ''
        let text2 = ''
        text1 = item.innerText
        text2 = text1.slice(0, text1.length - 1)
        item.innerText = text2
      })
    },
    // 给当日 所在周 设置 字体颜色
    SetWeekTextColor() {
      document.querySelectorAll('.fc-day-header')[new Date().getDay()].style = 'color: #16A0FE!important;'
    },
    changeMonth(start, end, current) {
      console.log('changeMonth', start.format(), end.format(), current.format())
    },
    eventLimitText(val) { // 还有多少项
      return '还有' + val + '项'
    },
    getCalendarEvents(info, successCallback, failureCallback) {
      console.log(info, successCallback, failureCallback, 'info, successCallback, failureCallback')
      const events = [
        ...this.calendarEvents
        // {
        //   title: info.startStr,
        //   start: info.start.valueOf()
        // }
      ]
      successCallback(events)
    },
    toggleWeekends() {
      this.calendarWeekends = !this.calendarWeekends // update a property
    },
    gotoPast() {
      this.calendarApi.gotoDate('2019-08-01') // call a method on the Calendar object
    },
    handleDateClick(arg) { // 添加项目
      // if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
      //   this.calendarEvents.push({ // add new event data
      //     title: 'New Event',
      //     start: arg.date,
      //     allDay: arg.allDay
      //   })
      // }
      this.calendarApi.refetchEvents()
    },
    handleEventClick(info) { // 获取当日信息
      console.log(info, 'info')
      console.log(info.event.extendedProps, 'info.event.extendedProps')
      // console.log(info.el, 'info.el')
      // info.el.style = ' position: relative;'
      // this.tankuangTop = '50%'// info.jsEvent.clientY
      // this.tankuangLeft = '50%'// info.jsEvent.clientX
      this.tanKuangShow(true)
      let startObj = this.ConversionDate(info.event.start)
      let endObj = null
      if (info.event.end) {
        endObj = this.ConversionDate(info.event.end)
      }
      let obj = info.event.extendedProps
      this.tanKuangDate = {
        year: startObj.year,
        month: startObj.month + 1,
        day: startObj.day,
        start: this.numberTen(startObj.hours) + ':' + this.numberTen(startObj.minutes),
        end: endObj ? this.numberTen(endObj.hours) + ':' + this.numberTen(endObj.minutes) : '00:00',
        titleText: obj.titleText,
        text: obj.text,
        teacher: obj.teacher
      }
    },
    tanKuangShow(flag) {
      this.tanKuangFlag = flag
    },
    numberTen(num) {
      return num < 10 ? ('0' + num) : num
    },
    ConversionDate(date) {
      return {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
        hours: date.getHours(),
        minutes: date.getMinutes()
      }
    }

  }
}
</script>
<style scoped lang="less">
// 引用 复用方法
@import url('./style/livefullcaledar.less');
.ColorAll(){
  @import url('./style/colorThan.less');
}
.hoverColorAll(){
  @import url('./style/hoverColor.less');
}
*{
font-family: PingFangSC-Medium, PingFang SC;
}
.LiveFullCaledar{
  width: 100%;
  height: 100%;
  background: #F5F8FA;
  padding: 50px 0;
  .LiveFullCaledar_pading{
    width: 900px;
    height: auto;
    margin: 0 auto;
    background: rgba(204,204,204,.1);
    padding: 20px;
  }
  .LiveFullCaledar_son{
    width: 840px;
    height: 1020px;
    margin: 0 auto;
    border: 1px solid #EDEDEE;
    background: #fff;
    border-bottom: 0;
    padding: 20px;
    .LiveFullCaledar_son_header{
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: start;
      align-items: center;
      // border-top: 1px solid #EDEDEE;
      // border: 1px solid #EDEDEE;
      // border-bottom: 0;
      p{
        width: 150px;
        height: 50px;
        text-align: left;
        line-height: 50px;
        font-size: 26px;
        font-family: DINAlternate-Bold, DINAlternate;
        font-weight: bold;
        color: #333333;
        margin-left: 5px;
      }
      button{
        width: 30px;
        height: 30px;
        background: #EFEFEF;
        border-radius: 4px;
        border: 1px solid #EEEEEE;
        // background: linear-gradient(180deg, #FCFCFC 0%, #FFFFFF 100%);
        margin-right: 5px;
        .DisplayFlex(space-around,center);
      }
      button:hover{
        background: #FAFAFA;
        border-radius: 4px;
        border: 1px solid #EEEEEE;
      }
      .header_today{
        width: 52px;
        height: 30px;
      }
    }
    .checkoutBox{
      width: 100%;
      height: auto;
      display: flex;
      flex-wrap: wrap;
      // padding: 10px;
      .checkoutBox_son{
        width: 154px;
        margin: 0 5px 5px 0;
        height: 32px;
        border-radius: 4px;
        line-height: 32px;
        text-align: center;
        cursor:pointer;
        position: relative;
        color: #333;
        background: #F9F9F9;
        i{
          position: absolute;
          bottom: 0;
          right: 0;
          width: 12px;
          height: 12px;
          border-radius: 4px 0px 4px 0px;
          background: rgba(204, 204, 204, 1);
          color: #fff;
        .DisplayFlex(space-around,center);
        }
        .ColorAll();
      }
      .ColorAll();
    }
  }
}
#tanKuang{
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0,.5);
  position: fixed;
  top: 0;
  left: 0;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%,-50%);
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 999;
  .tanKuang_son{
      width: 330px;
      height: 164px;
      background: #FFFFFF;
      box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.04);
      border-radius: 4px;
        padding:15px;
      .tanKuang_nav{
        .DisplayFlex(space-between,center);
        font-size: 16px;
        font-family: KKBfont;
        color: #333333;
        line-height: 15px;
        span{
          .Cursor();
        }
      }
      .tankuang_title_text{
        width: 100%;
        height: 80px;
        margin-top: 10px;
        .tankuang_title{
          width: 100%;
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #333333;
          line-height: 22px;
        }
        .tankuang_text{
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          line-height: 17px;
        }
      }
      .tankuang_img_btn{
        width: 100%;
        height: auto;
        .DisplayFlex(space-between,center);
        .img_btn_left{
          width: 100px;
          height: auto;
        .DisplayFlex(start,center);
          img{
            width: 20px;
            border-radius: 50%;
          }
          p{
            margin-left: 10px;
          }
        }
        .img_btn_right{
          width: 82px;
          height: 32px;
          background: #199FFF;
          line-height: 31px;
          text-align: center;
          border-radius: 4px;
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #FFFFFF;
        }
      }
  }

}
/deep/.fc{
  *{
    border: 0;
      // border: 1px solid #EDEDEE;
    border-color: #EDEDEE;
    font-family: KKBfont-Regular, KKBfont;
    font-weight: 400;
    // color: #333333;
  }
  .fc-time{
    display: none;
  }
  .fc-popover,.fc-more-popover {
    width: 213px!important;
    background: #FFFFFF!important;
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.04)!important;
    border:0!important;
    padding-top:10px!important ;
    padding-bottom:5px!important ;
    .fc-header,.fc-widget-header{
      background: #FFFFFF!important;
      .fc-title{
        font-size: 24px;
        font-family: KKBfont;
        color: #333333;
        line-height: 23px;
        margin-left: 15px;
      }
      .fc-close,.fc-icon,.fc-icon-x{
        display: none!important;
      }
    }
    .fc-body,.fc-widget-content{
      .fc-event-container{
        .fc-time{
          display: inline-block!important;
        }
        a{
          width: 173px!important;
          height: 21px!important;
          line-height: 21px!important;
          border: 0!important;
          border-radius: 0!important;
          margin-left: 10px;
        }
      }
    }
  }
  .fc-toolbar{
    display: flex!important;
    justify-content:start!important;
    align-items: center;
    .fc-left{
      color: #222222!important;
      .FontSize(30px);
      .Width(300px);
      // text-align: right!important;
    }
    .fc-center{
      .fc-button-group{
        button{
          .Width(30px);
          .Height(30px);
          .Color(#979797);
          border: 1px solid #EEEEEE!important;
          background: #FFFFFF;
          .DisplayFlex(space-around,center);
          .Marginleft(10px);
          outline: none;
        }
      }
      button{
        .Width(52px);
        .Height(30px);
        .Color(#979797);
        border: 1px solid #EEEEEE!important;
        background: #FFFFFF;
      }
    }
    .fc-right{
      width: 50px;
      height: 50px;
      // background: deeppink;
    }
  }
  .fc-view-container{
    // border:1px solid #EDEDEE!important;
    border-radius: 6px!important;
    // border-bottom: 0!important;
    // box-sizing: content-box;
      .fc-view,.fc-dayGridMonth-view,.fc-dayGrid-view{
        border-radius: 6px;
        table{
          border-radius: 6px;
          thead{
            border-radius: 6px;
            tr{
              border-radius: 6px;
                th{
                  border-radius: 6px;
                }
              }
            }
          tbody{
            border-radius: 6px;
          }
        }
      }
  }
  .fc-head{
      border:0!important;
    .Height(32px);
    tr{
      .Height(32px);
      border:0!important;
      th{
        border: 1px solid #EEEEEE!important;
        .Height(32px);
        // .DisplayFlex(start,center)
        border:0!important;
        .Lineheight(32px);
        .Textalign(left);
        .Color(#333333);
        .FontSize(12px);
        .Background(#FCFCFC);
        .Paddingleft(5px);
        // border-bottom:0!important;
      }
    }
  }

  .fc-day-grid{
    // border:0;
    .fc-content-skeleton{
      .Width(100%);
      .Background(#fff);
      .fc-day-number{
        float: left!important;
        .Marginleft(3px);
        .Margintop(3px);
        .Marginbottom(2px);
      }
    }
  }
  .fc-row,.fc-week,.fc-widget-content:last-child{
    // border-bottom:0;
    // box-sizing:border-box!important;
  }
  .fc-row,.fc-week,.fc-widget-content,.fc-rigid{
    border-bottom:.1px solid #EDEDEE;
    box-sizing:border-box!important;
    .fc-bg{//当天背景去掉默认颜色
      *{
        .Background(#fff);
      }
    }
    .fc-today{//当天的样式
      .Background(#fff);
      span{
        .Width(24px);
        .Height(24px);
        .Background(#16A0FE);
        .FontSize(12px);
        border-radius: 50%!important;
        .Color(#fff);
        .DisplayFlex(space-around,center);
      }
    }
    .fc-content-skeleton{
      tbody{
        tr{
          border-top: 1px solid #fff!important;
        }
      }
      .fc-day-top{
          .Width(24px);
          .Height(24px);
        .FontSize(12px);
      }
      .fc-day-number{
          .Width(24px);
          .Height(24px);
        .FontSize(12px);
          .DisplayFlex(space-around,center);
      }
      .fc-unthemed{
        .Background(#fff);
      }
      .fc-event-container{
        border-radius: 0!important;
        .fc-day-grid-event,.fc-h-event,.fc-event,.fc-start,.fc-end{
          .Color(#222);
          border:0!important;
          border-radius: 0!important;
          .Padding(0px);
          .Margin(0px);
          .fc-content{
            .Paddingleft(5px);
            white-space: nowrap;/*溢出不换行 */
            overflow: hidden;/*超出部分隐藏 */
            text-overflow: ellipsis;/*溢出用省略号显示 */
            border-right: 1px solid #fff;
            padding-top:2px!important;
            padding-bottom:2px!important;
            .FontSize(12px);
          }
        }
        .ColorAll();
        .hoverColorAll();
        .deepskyblue{
          border:0!important;
          .Color(#fff);
          border-left: 3px solid #000!important;
        }
      }
      .fc-more{
           text-decoration: none!important;
           color: #999999!important;
      }
       .fc-more:hover{
           color: #199FFE!important;
      }
    }
  }
  .fc-popover,.fc-more-popover{
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.04)!important;
    .fc-body,.fc-widget-content{
          border:0!important;
      .fc-event-container{
        .ColorAll();
        .hoverColorAll();
        .fc-content{
        .FontSize(10px);
        }
      }
    }
  }
  .fc-body{
    border:0!important;
  }
  .fc-dayGrid-view,.fc-body,.fc-row{
    // height: 120px!important;
  }
}
</style>