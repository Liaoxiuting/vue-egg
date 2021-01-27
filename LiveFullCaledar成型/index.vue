<template>
  <div class="calendar-for-live">
    <div class="live-calendar-wrapper">
      <div class="live-calendar-content">
        <div class="live-calendar-header">
          <p>{{ dateText.year }}年{{ numberTen(dateText.month+1) }}月</p>
          <button @click="prevClick">
            <img src="https://img.kaikeba.com/a/13337191101202rury.png" alt="">
          </button>
          <button @click="nextClick">
            <img src="https://img.kaikeba.com/a/05337191101202jcqb.png" alt="">
          </button>
          <button class="header_today" @click="todayClick">今天</button>
        </div>
        <div class="checkoutBox">
          <div
            v-for="(item,index) in checkoutBoxArr"
            :key="index"
            :class="['checkoutBox_son',checkoutChoiceArrIndexOf(item.text)===-1?'':item.classNameOne]"
            @click="onFilterBtnClick(item)"
          >
            {{ item.text }}
            <i :class="['ivu-icon', 'ivu-icon-checkmark','checkoutBox_son_choice',checkoutChoiceArrIndexOf(item.text)===-1?'':item.classNameTwo]">
              <!-- <img src="https://img.kaikeba.com/a/84031191101202rbpl.png" alt=""> -->
              <img src="https://img.kaikeba.com/a/05137191101202ofzw.png" alt="">
            </i>
          </div>
        </div>
        <FullCalendar
          id="FullCalendar"
          ref="fullCalendar"
          defaultView="dayGridMonth"
          locale="zh-cn"
          :firstDay="1"
          height="auto"
          :header="false"
          :aspectRatio="1.01"
          :weekNumbersWithinDays="true"
          :initialView="initialView"
          :buttonText="buttonText"
          :plugins="calendarPlugins"
          :weekends="calendarWeekends"
          :events="calendarEvents"
          :eventLimit="4"
          :eventLimitText="eventLimitText"
          :dayPopoverFormat="dayPopoverFormat"
          :eventTimeFormat="eventTimeFormat"
          @dateClick="handleDateClick"
          @eventClick="handleEventClick"
          @changeMonth="changeMonth"
          @eventMouseEnter="eventMouseEnter"
        />
      </div>
    </div>
    <div v-show="eventPopVisible" class="event-pop-container eventPop">
      <div class="event-pop-header">
        <p>
          {{ currentEvent.month }}.{{ currentEvent.day }} {{ currentEvent.start }}-{{ currentEvent.end }}
        </p>
        <img
          :src="hoverImg"
          alt=""
          @click="eventPopShow(false, '')"
          @mouseover="mouseover"
          @mouseout="mouseout"
        />
      </div>
      <div class="event-pop-body">
        <p class="event-pop-course">{{ currentEvent.course_name }}</p>
        <!-- 直播名 -->
        <p class="event-pop-live-name">{{ currentEvent.live_name }}</p>
      </div>
      <div class="event-pop-footer">
        <div class="event-pop-teacher-img">
          <img :src="currentEvent.avatar" alt="教师"><p> {{ currentEvent.teacher }} </p>
        </div>
        <template v-if="currentEvent.status === 2 || currentEvent.status === 4">
          <div class="img_btn_right status_right">
            已结束
          </div>
        </template>
        <template v-else>
          <div class="img_btn_right" @click="toLiveRoom(currentEvent)">
            {{ currentEvent.status === 3 ? '看回放': '看直播' }}
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { getCalendarList } from '@/api/liveCalendar.js'
import 'lodash'
import { CONTENT_TYPE } from 'constants/index'
import { CONTRACT_URL, LEARN_CENTER_URL, PLAY_URL } from 'constants/url'
import { courseContent, urlCourseList } from 'api/apis'
import { courseIsContract } from 'api/course'
import { mapGetters } from 'vuex'
// import eventsArr from './eventArr'

export default {
  name: 'LiveFullCalendar',
  components: {
    FullCalendar
  },
  data() {
    return {
      eventTimeFormat: {
        hour: '2-digit',
        minute: '2-digit',
        meridiem: false,
        hour12: false
      },
      defaultAvatar: 'https://img.kaikeba.com/a/72248162101202viep.png',
      hoverImg: 'https://img.kaikeba.com/a/10637191101202aanw.png',
      classTitle: '',
      currentEvent: {
        year: '',
        month: '',
        day: '',
        start: '',
        end: '',
        titleText: '',
        text: ''
      },
      dateText: {
        year: '',
        month: '',
        day: ''
      },
      checkoutBoxArr: [],
      // checkoutBoxArr: [{ text: '算法数据' }, { text: '产品经理年底复盘' }, { text: 'Web前端高级工程师' }, { text: '数据分析与增长黑客' }, { text: '交互设计' }, { text: '产品思维' }, { text: '大数据分析' }],
      checkoutChoiceArr: [],
      // checkoutChoiceArr: ['算法数据', '产品经理年底复盘', 'Web前端高级工程师', '数据分析与增长黑客', '交互设计', '产品思维', '大数据分析'],
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
        classNameOne: 'BlueCyanColorThan',
        classNameTwo: 'BlueCyanColor'
      }, {
        classNameOne: 'CyanColorThan',
        classNameTwo: 'CyanColor'
      }, {
        classNameOne: 'YellowOrangeColorThan',
        classNameTwo: 'YellowOrangeColor'
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
      eventPopVisible: false,
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
      calendarEvents: [],
      calendarApi: null,
      eventList: [], // 拷贝 events 数据
      // 签署协议授权弹窗
      isSignShow: false,
      flagContract: false,
      signUrl: null,
      status: new Map()
        .set(0, '未开始')
        .set(1, '直播中')
        .set(2, '已结束')
        .set(3, '已生成回放')
        .set(4, '生成回放异常')
        .set(5, '备课中'),
      popEle: null
    }
  },
  computed: {
    ...mapGetters({
      getCurrCourseName: 'Calendar/getCurrCourseName'
    })
  },
  async created() {
    this.SetDateText('today')
    await this.getAllCourseList()
    await this.getDayTime()
  },
  mounted() {
    this.calendarApi = this.$refs.fullCalendar.getApi()
    this.SetWeekTextColor() // 给当日 所在周 设置 字体颜色
    this.SetDayText() // 修改每日显示日文字   例：1日 变 1
    let activeLive = document.querySelectorAll('.fc-event-container')
    console.log(activeLive, 'activeLive')
    // this.popEle = document.querySelector('.eventPop')
    // document.body.appendChild(this.popEle)
    // const a = document.querySelectorAll('.fc-mon')
    // a.onmouseenter = this.onDateHover()
  },
  beforeDestroy() {
    // document.body.removeChild(this.popEle)
  },
  methods: {

    async getAllCourseList() {
      const { data } = await urlCourseList()
      if (data.code === 1) {
        const { vip, public: publicList } = data.data
        const tempList = vip.concat(publicList).filter(val => val.expired_status !== 2)
        this.loopSetEventsArray(tempList)
      } else {
        this.$Message.error(res.msg)
      }
    },
    async toLiveRoom(item) {
      console.log(item, 'item')
      let flag = await this.isSignAgreement(item.course_id)
      if (!flag) {
        return
      }
      console.log('enter::', item)
      sessionStorage.setItem('catalogUrl', window.location.href)
      sessionStorage.setItem('publicState', '0')

      let contentId = null
      let vendor = null

      const navigateLive = (type, innerContentId) => {
        if (type === CONTENT_TYPE.CCLIVE_HKY_IM || type === CONTENT_TYPE.HKY_LIVE) { // 慧科云直播
          window.location.href = `${PLAY_URL}/video/${innerContentId}`
        } else {
          this.$router.push('/video/' + innerContentId)
        }
      }

      if (Object.keys(item).length > 0) {
        contentId = item.content_id
        vendor = item.live_vendor
        let sendData = {
          content_id: contentId
        }
        if (vendor === 1) {
          navigateLive(item.content_type, contentId)
        } else {
          courseContent(sendData).then(res => {
            let resDatas = res.data
            if (resDatas.code === 1) {
              let status =
                resDatas.data.content_type === 2 &&
                [0, 1].indexOf(resDatas.data.content[0].status) > -1
              status =
                status ||
                (resDatas.data.content_type === 7 &&
                  resDatas.data.content[0].video_vendor === 3)

              if (status) {
                window.open(
                  `https://www.eeo.cn/client/invoke/index.html?${
                    resDatas.data.content[0].boot_params.schema.split('?')[1]
                  }`,
                  '_blank'
                )
              } else {
                navigateLive(item.content_type, contentId)
              }
            } else {
              this.$Message.error(resDatas.msg)
            }
          })
        }
      }
    },
    // 签署协议授权弹窗
    handleSign() {
      window.open(this.signUrl)
    },
    // 关闭弹窗
    handleClose() {
      this.isSignShow = false
      this.signUrl = null
      this.flagContract = false
    },
    // 验证该课程是否需要签订协议
    isSignAgreement(courseId) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async(resolve) => {
        try {
          this.flagContract = true
          let res = await courseIsContract({ course_id: courseId })
          let resDate = res && res.data
          let { data, code } = resDate
          if (code === 1) {
            if (data.result === 1) {
              let backUrl = encodeURIComponent(`${LEARN_CENTER_URL}/catalog/${courseId}`)
              let params = `order_id=${data.orderNo}&back_url=${backUrl}`
              this.isSignShow = true
              this.signUrl = `${CONTRACT_URL}/view?${params}`
            } else {
              resolve(true)
            }
          } else {
            this.$Message.error(data.msg)
            resolve(false)
          }
        } catch (error) {
          this.$Message.error('网络错误，请稍后再试！')
          resolve(false)
        }
      })
    },
    // X老师
    teacherName(name) {
      let str = name.slice(0, 1)
      return str + '老师'
    },
    // 获取这月的 切起止时间  并进行 请求
    async getDayTime() {
      let month = (this.dateText.month + 1) < 10 ? '0' + (this.dateText.month + 1) : (this.dateText.month + 1)
      let time = this.dateText.year + '-' + month + '-' + this.dateText.day
      this.startTime = this.getCurrentMonthFirst(time)
      this.endTime = this.getCurrentMonthLast(time)
      await this.CalendarList()
    },
    // 获取 当月的 第一天
    getCurrentMonthFirst(time) {
      let date = new Date(time)
      date.setDate(1)
      let month = parseInt(date.getMonth() + 1)
      let day = date.getDate()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      return date.getFullYear() + '-' + month + '-' + day
    },
    // 获取 当月的 第最后一天
    getCurrentMonthLast(time) {
      let date = new Date(time)
      let currentMonth = date.getMonth()
      let nextMonth = ++currentMonth
      let nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1)
      let oneDay = 1000 * 60 * 60 * 24
      let lastTime = new Date(nextMonthFirstDay - oneDay)
      let month = parseInt(lastTime.getMonth() + 1)
      let day = lastTime.getDate()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      return date.getFullYear() + '-' + month + '-' + day
    },
    liveStatus() { // Todo 直播中 加icon（待敲）
      this.eventList.forEach(item => {
        let title = ''
        if (item.status === 1) {
          title = item.title
          item.title = '[直播中]' + title
        }
      })
    },
    // /calendar/list   请求获取数据 方法
    async CalendarList() {
      this.calendarEvents = []
      this.eventList = []
      let obj = { start_time: this.startTime + ' 00:00:00', end_time: this.endTime + ' 23:59:59', course_ids: [] }
      // let params = qs.stringify(obj)
      let { data } = await getCalendarList(obj) // 获取当月的直播课
      // console.log('2 ', courseData)
      if (data.data.length) {
        // this.loopSetEventsArray(data.data)
        // this.initEvents(eventsArr) // Todo 调试
        this.initEvents(data.data) // Todo 调试
        // this.liveStatus() Todo 直播状态
        this.loopEventsColor()
      }
      // console.log(this.calendarEvents, ' this.calendarEvents ')
    },
    initEvents(data) {
      this.calendarEvents = []
      data.forEach((item) => {
        this.eventList.push({
          ...item,
          title: item.course_name,
          titleColor: item.course_name,
          start: item.start_time,
          end: item.end_time,
          avatar: item.avatar ? item.avatar : this.defaultAvatar,
          teacher: this.teacherName(item.teacher_realname),
          classNameOne: '',
          classNameTwo: ''
        })
      })
      // this.calendarEvents = this.eventList
      this.calendarEvents = this.eventList.filter(val => this.checkoutChoiceArr.includes(val.title))

      // if (this.getCurrCourseName) {
      //   const temp = data.find(val => val.course_name === this.getCurrCourseName)
      //   const tempIndex = data.findIndex(val => val.course_name === this.getCurrCourseName)
      //   this.calendarEvents.push({
      //     title: temp.course_name,
      //     titleColor: temp.course_name,
      //     id: tempIndex,
      //     start: temp.start_time,
      //     end: temp.end_time,
      //     ...temp
      //   })
      // } else {
      //   this.calendarEvents = this.eventList
      // }
    },
    loopSetEventsArray(data) { // 获取到数据 后 将复选按钮的课程 筛选出来 并且加上颜色
      let tempArr = []
      this.checkoutBoxArr = []
      data.forEach(item => {
        tempArr.push(item.course_name)
      })
      tempArr = [...new Set(tempArr)]
      tempArr.forEach(item => {
        this.checkoutBoxArr.push({ text: item })
      })
      if (this.getCurrCourseName) {
        this.checkoutChoiceArr = []
        this.checkoutChoiceArr.push(this.getCurrCourseName)
      } else {
        this.checkoutChoiceArr = tempArr
      }
      this.loopAddColorFunction()
    },
    loopAddColorFunction() { // 循环添加颜色
      let count = -1
      this.checkoutBoxArr.forEach((item, index) => {
        if (count > this.checkoutColor.length - 2) {
          count = 0
        } else {
          count++
        }
        this.checkoutBoxArr[index].classNameOne = this.checkoutColor[count].classNameOne
        this.checkoutBoxArr[index].classNameTwo = this.checkoutColor[count].classNameTwo
      })
      this.checkoutBoxArr.forEach(item => {
        this.calendarEvents.forEach((itm, idn) => {
          if (item.text === itm.titleColor) {
            this.calendarEvents[idn].className = item.classNameOne
            this.calendarEvents[idn].classNameTwo = item.classNameTwo
          }
        })
      })
    },
    // 给events日历数据 循环添加 自有颜色 并加上 直播中 的 class类
    loopEventsColor() {
      this.checkoutBoxArr.forEach(item => {
        this.eventList.forEach(v => {
          if (item.text === v.titleColor) {
            v.className = item.classNameOne
            if (v.status === 1) {
              let class_name = v.className
              v.className = class_name + ' ' + 'activeLive' + ' ' + item.classNameTwo
            }
            v.classNameOne = v.className
            v.classNameTwo = item.classNameTwo
          }
        })
        this.calendarEvents.forEach(v => {
          if (item.text === v.titleColor) {
            v.className = item.classNameOne
            if (v.status === 1) {
              let class_name = v.className
              v.className = class_name + ' ' + 'activeLive' + ' ' + item.classNameTwo
            }
            if (v.status > 1 && v.status < 5) {
              let class_name = v.className
              v.className = class_name + ' ' + 'greyColorThan'
            }
            v.classNameOne = v.className
            v.classNameTwo = item.classNameTwo
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
      console.log(this.selectedMonth, 'this.selectedMonth')
      this.SetDateText('next')
      this.getDayTime()
      this.SetWeekTextColor()
      this.eventPopShow(false, '')
      this.SetDayText()
    },
    prevClick() { // 上个月切换按钮
      let calendarApi = this.$refs.fullCalendar.getApi()
      calendarApi.prev()
      this.SetDateText('prev')
      this.getDayTime()
      this.SetWeekTextColor()
      this.eventPopShow(false, '')
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
      this.eventPopShow(false, '')
      this.getDayTime()
      this.SetWeekTextColor()
      this.SetDayText()
    },
    onFilterBtnClick(item) { // 复选框  点击显示操作
      this.checkoutChoiceArrSome(item)
      let arr = []
      if (this.checkoutChoiceArr.length > 0) {
        arr = this.eventList.filter(itm => {
          return this.checkoutChoiceArrIndexOf(itm.titleColor) !== -1
        })
      } else {
        arr = []
        // arr = this.eventList
      }
      this.calendarEvents = arr
      this.eventPopShow(false, '')
    },
    checkoutChoiceArrSome(item) { // 复选操作  多个复选按钮选中状态
      let itemArr = this.checkoutChoiceArr
      let flag = itemArr.some(v => {
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
    checkoutChoiceArrIndexOf(str) { // 复选框  indexOf
      return this.checkoutChoiceArr.indexOf(str)
    },
    // 修改每日显示日文字   例：1日 变 1
    SetDayText() {
      let dayTextArr = []
      dayTextArr = document.querySelectorAll('.fc-day-number')
      dayTextArr.forEach(item => {
        let text1 = item.innerText
        item.innerText = text1.slice(0, text1.length - 1)
      })
    },
    // 给当日 所在周 设置 字体颜色
    SetWeekTextColor() {
      document.querySelectorAll('.fc-day-header')[new Date().getDay() === 0 ? 7 : new Date().getDay() - 1].style = 'color: #16A0FE!important;'
    },
    changeMonth(start, end, current) {
      console.log('changeMonth', start.format(), end.format(), current.format())
    },
    eventLimitText(val) { // 还有多少项
      return '还有' + val + '项'
    },
    // events 数据
    getCalendarEvents(info, successCallback, failureCallback) {
      console.log(info, 'info')
      // this.liveStatus()
      let events = this.calendarEvents
      successCallback(events)
    },
    toggleWeekends() {
      this.calendarWeekends = !this.calendarWeekends // update a property
    },
    gotoPast() {
      this.calendarApi.gotoDate('2019-08-01') // call a method on the Calendar object
    },
    handleDateClick(info) { // 添加项目
      // if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
      //   this.calendarEvents.push({ // add new event data
      //     title: 'New Event',
      //     start: arg.date,
      //     allDay: arg.allDay
      //   })
      // }
      // console.log('day click', info)
      this.calendarApi.refetchEvents()
    },
    handleEventClick(info) { // 获取当日信息
      let startObj = this.ConversionDate(info.event.start)
      let endObj = null
      let currEvent = info.event.extendedProps
      console.log('info', info)
      if (info.event.end) {
        endObj = this.ConversionDate(info.event.end)
      }
      if (currEvent.live_id !== this.currentEvent.live_id || !this.eventPopVisible) {
        this.classTitle = info.event.extendedProps.titleColor
        this.eventPopShow(true, currEvent.live_id, info.jsEvent)
      }
      this.currentEvent = {
        ...currEvent,
        year: startObj.year,
        month: startObj.month + 1,
        day: startObj.day,
        start: this.numberTen(startObj.hours) + ':' + this.numberTen(startObj.minutes),
        end: endObj ? this.numberTen(endObj.hours) + ':' + this.numberTen(endObj.minutes) : '00:00',
        titleText: currEvent.titleText,
        text: currEvent.text,
        teacher: currEvent.teacher,
        avatar: currEvent.avatar
      }
    },
    // 弹框显示时 设置选中颜色
    eventPopShow(flag, liveId, event) {
      // this.SelectedStatus()
      this.highlightEvent(liveId)
      this.eventPopVisible = flag
      if (event) {
        const wrapper = document.querySelector('.calendar-for-live')
        const wrapperOffsetTop = wrapper.getBoundingClientRect().top
        const wrapperOffsetLeft = wrapper.getBoundingClientRect().left
        const offsetX = event.target.getBoundingClientRect().left // 鼠标距离当前event的左上角的offset
        const offsetY = event.target.getBoundingClientRect().top
        const w = document.body.clientWidth
        // const x = event.pageX - offsetX
        // const y = event.pageY - offsetY - 2
        console.log('offsetX', offsetX)
        console.log('offsetY', offsetY)
        const offset = offsetX - (w / 2) > 0 ? -345 : 120 // 如果当前event位于屏幕中间线的右侧，则弹窗居左，防止边界溢出
        const popLayer = document.querySelector('.eventPop')
        // popLayer.style.top = wrapperOffsetTop > 0 ? (offsetY - wrapperOffsetTop - 2) + 'px' : (offsetY - 2) + 'px'
        popLayer.style.top = (offsetY - wrapperOffsetTop - 3) + 'px'
        popLayer.style.left = offsetX - wrapperOffsetLeft + offset + 'px'
      }
      this.classTitle = this.eventPopVisible ? this.classTitle : ''
    },
    // getOffsetXY(evt) {
    //   if (evt.offsetX && evt.offsetY) {
    //     return {
    //       x: evt.offsetX,
    //       y: evt.offsetY
    //     }
    //   }
    //   let ele = evt.target || evt.srcElement
    //   let o = ele
    //   let x = 0
    //   let y = 0
    //   while (o.offsetParent) {
    //     x += o.offsetLeft
    //     y += o.offsetTop
    //     o = o.offsetParent
    //   }
    //   // 处理当元素处于滚动之后的情况
    //   let left = 0
    //   let top = 0
    //   while (ele.parentNode) {
    //     left += ele.scrollLeft
    //     top += ele.scrollTop
    //     ele = ele.parentNode
    //   }
    //   return {
    //     x: evt.pageX + left - x,
    //     y: evt.pageY + top - y
    //   }
    // },
    highlightEvent(liveId) {
      const temp = this.calendarEvents
      temp.forEach(val => {
        if (val.live_id === liveId) {
          val.classNameOne = val.className
          val.className = val.classNameTwo
          if (val.status === 1) {
            val.className = val.className + ' activeLive'
          }
        } else {
          if (val.className.indexOf(val.classNameTwo) > -1) {
            val.className = val.classNameOne
          }
        }
      })
      this.calendarEvents = _.cloneDeep(temp)
    },
    // 点击 给相关课程 添换颜色
    SelectedStatus() {
      let SelectedArr = this.calendarEvents
      // let SelectedArr = this.eventList
      let title = this.classTitle
      let class_name = ''
      let class_name_two = ''
      // console.log('SelectedArr ---------------------', SelectedArr)
      SelectedArr.forEach((item, index) => {
        console.log('item ', item.title, ' -> ', item.titleColor)
        if (item.titleColor.indexOf(title) !== -1) {
          class_name = item.classNameTwo
          class_name_two = item.className
          item.classNameTwo = class_name_two
          item.className = class_name
        } else {
          class_name = item.className
          class_name_two = item.classNameTwo
          item.classNameTwo = class_name_two
          item.className = class_name
          if (item.className.indexOf('Than') === -1) {
            item.classNameTwo = class_name
            item.className = class_name_two
          }
        }
      })
      this.eventList = _.cloneDeep(SelectedArr)
      this.calendarEvents = _.cloneDeep(SelectedArr)
      // this.calendarEvents = SelectedArr
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
    },
    // 弹框划入显示效果图
    mouseover() {
      this.hoverImg = 'https://img.kaikeba.com/a/91147191101202wnkd.png'
    },
    // 弹框移除显示效果图
    mouseout() {
      this.hoverImg = 'https://img.kaikeba.com/a/64147191101202rqje.png'
    },
    dayPopoverFormat(info) {
      return `${info.date.day}`
    },
    eventMouseEnter(info) {
      console.log('eventMouseEnter --> ', info)
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
.calendar-for-live{
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
  .live-calendar-wrapper{
    width: 100%;
    margin: 0 auto;
    padding: 3px 20px 13px;
  }
  .live-calendar-content{
    margin: 0 auto;
    // border: 1px solid #EDEDEE;
    background: #fff;
    border-bottom: 0;
    position: relative;
    .live-calendar-header{
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: start;
      align-items: center;
      margin-top: 3px;
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
        background: #ffffff;
        border-radius: 4px;
        border: 1px solid #EEEEEE;
        // background: linear-gradient(180deg, #FCFCFC 0%, #FFFFFF 100%);
        margin-right: 5px;
        .DisplayFlex(space-around,center);
        cursor:pointer;
        img{
          width: 20px;
        }
      }
      button:hover{
        background: #FAFAFA;
        border-radius: 4px;
        border: 1px solid #EEEEEE;
      }
      button:active{
        background: #EEEEEE;
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
      margin-top: 20px;
      .checkoutBox_son{
        width: 153px;
        margin: 0 5px 5px 0;
        padding: 0 15px 0 15px;
        height: 32px;
        border-radius: 4px;
        line-height: 32px;
        text-align: center;
        cursor:pointer;
        position: relative;
        color: #333;
        background: #F9F9F9;
        white-space: nowrap;/*溢出不换行 */
        overflow: hidden;/*超出部分隐藏 */
        text-overflow: ellipsis;/*溢出用省略号显示 */
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
          img{
            width: 7px;
          }
        }
        .ColorAll();
      }
      .ColorAll();
    }
    #FullCalendar{
      margin-top: 20px;
    }
    .footer{
      width: 100%;
      height: 2px;
      background: #fff;
      position: absolute;
      bottom: 84px;
      left: 0;
      z-index:1;
    }
  }
  &::-webkit-scrollbar {
    display: none;
  }
}
#tanKuang{
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0,.5);
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 999;

}
.event-pop-container{
    width: 330px;
    position: absolute;
    top: 50%;
    left: 50%;
    //transform: translate(-50%, -50%);
    z-index: 999;
    background: #FFFFFF;
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.04);
    border-radius: 4px;
    padding: 15px;
    .event-pop-header{
      .DisplayFlex(space-between,center);
      font-size: 16px;
      color: #333333;
      line-height: 15px;
      p {
        font-family: DINAlternate-Bold, DINAlternate;
        font-size: 16px;
        position: relative;
        &:before {
          content: '';
          width: 112px;
          height: 8px;
          background: #16A0FE;
          position: absolute;
          bottom: 0;
          left: 0;
          opacity: .1;
        }
      }
      img{
        width: 22px;
        cursor: pointer;
      }
      span{
        .Cursor();
      }
    }
    .event-pop-body{
      width: 100%;
      margin: 10px 0 18px;
      .event-pop-course{
        width: 100%;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
        line-height: 22px;
      }
      .event-pop-live-name{
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 17px;
        margin-top: 5px;
      }
    }
    .event-pop-footer{
      width: 100%;
      height: auto;
      .DisplayFlex(space-between,center);
      .event-pop-teacher-img{
        width: 100px;
        height: auto;
      .DisplayFlex(start,center);
        img{
          width: 22px;
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
        line-height: 32px;
        text-align: center;
        border-radius: 4px;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        cursor: pointer;
        &:hover{
          background: #107ECC;
        }
        &.status_right {
          background: #ccc;
          &:hover{
            background: #ccc;
          }
        }
      }
    }
}
/deep/.fc{
  *{
    border: 0;
    //border: 1px solid #EDEDEE;
    font-family: KKBfont-Regular, KKBfont, PingFangSC-Medium, PingFang SC;
    font-weight: 400;
  }
  .fc-dayGrid-view .fc-body .fc-row {
    height: 120px !important;
    .fc-content-skeleton {
      padding-bottom: 0;
    }
  }
  .fc-time{
    display: none;
  }
  .fc-more-cell{//还有多少项
    height: 20px!important;
    line-height: 20px!important;
  }
  .fc-popover,.fc-more-popover {
    width: 213px!important;
    background: #FFFFFF!important;
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.04)!important;
    border:0!important;
    padding-top:10px!important ;
    padding-bottom:5px!important ;
    .fc-header,.fc-widget-header{
      background: #FFFFFF!important;
      .fc-title{
        font-size: 24px;
        font-family: DINAlternate-Bold, DINAlternate;
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
          width: 35px;
        }
        a{
          width: 173px!important;
          height: 21px!important;
          //line-height: 21px!important;
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
        //.Marginbottom(2px);
      }
    }
  }
  .fc-row,.fc-week,.fc-widget-content:last-child{
    // border-bottom-color:#fff;
    // box-sizing:border-box!important;
  }
  .fc-row,.fc-week,.fc-widget-content,.fc-rigid{
    border-bottom:.1px solid #f8f8f8;
    box-sizing:border-box!important;
    .fc-bg{//当天背景去掉默认颜色
      *{
        .Background(#fff);
      }
    }
    .fc-today{//当天的样式
      .Background(#fff);
      span{
        .Background(#16A0FE);
        border-radius: 50%!important;
        .Color(#fff);
      }
    }
    .fc-content-skeleton{
      tbody{
        tr{
          border: 0!important;
        }
      }
      .fc-day-top{
          .Width(24px);
          .Height(24px);
        .FontSize(12px);
      }
      .fc-day-number{
        display: inline-block;
        padding: 0;
        width: 24px;
        height: 24px;
        font-size: 16px;
        line-height: 24px;
        font-weight: 400!important;
        text-align: center;
        font-family: DINAlternate-Bold, DINAlternate;
      }
      .fc-unthemed{
        .Background(#fff);
      }
      .fc-event-container{
        border-radius: 0!important;
        .fc-day-grid-event,.fc-h-event,.fc-event,.fc-start,.fc-end{
          display: flex;
          align-items: center;
          height: 21px;
          color: #222;
          border:0!important;
          border-radius: 0!important;
          .Padding(0px);
          margin: 2px 0 0;
          .fc-content{
            position: relative;
            height: 21px;
            box-sizing: border-box;
            padding-left: 10px;
            padding-right: 5px;
            white-space: nowrap;/*溢出不换行 */
            overflow: hidden;/*超出部分隐藏 */
            text-overflow: ellipsis;/*溢出用省略号显示 */
            border-right: 1px solid #fff;
            width: 100%;
            //padding-top:2px!important;
            //padding-bottom:2px!important;
            .FontSize(12px);
            display: flex;
            align-items: center;
            .fc-title {
              flex: 1;
              white-space: nowrap;/*溢出不换行 */
              overflow: hidden;/*超出部分隐藏 */
              text-overflow: ellipsis;/*溢出用省略号显示 */
              display: inline-block;
              height: 16px;
              line-height: 16px;
            }
          }
          &.activeLive {
            .fc-content {
              .fc-title {
                position: relative;
                padding-left: 16px;
                &:before {
                  content: '';
                  position: absolute;
                  width: 12px;
                  height: 12px;
                  background: url("https://img.kaikeba.com/a/11235180101202luuu.gif") 0 0/cover no-repeat;
                  top: 1px;
                  left: 0;
                }
              }
            }
          }
        }
        .ColorAll();
        // .hoverColorAll();
        .deepskyblue{
          border:0!important;
          .Color(#fff);
          border-left: 3px solid #000!important;
        }
      }
      .fc-more{
        text-decoration: none!important;
        color: #999999!important;
        padding-left: 7px;
      }
       .fc-more:hover{
         color: #199FFE!important;
      }
    }
  }
  .fc-more-popover{
    z-index: 999!important;
  }
  .fc-popover,.fc-more-popover{
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.04)!important;
    .fc-body,.fc-widget-content{
      border:0!important;
      .fc-event-container{
        .ColorAll();
        // .hoverColorAll();
          // z-index: 999!important;
        .fc-start,.fc-end {
          display: flex;
          align-items: center;
        }
        .fc-content{
          white-space: nowrap;/*溢出不换行 */
          overflow: hidden;/*超出部分隐藏 */
          text-overflow: ellipsis;/*溢出用省略号显示 */
          padding-left: 10px;
          padding-right: 5px;
        .FontSize(10px);
          // z-index: 999!important;
          display: flex;
          align-items: center;
          .fc-title {
            flex: 1;
            white-space: nowrap;/*溢出不换行 */
            overflow: hidden;/*超出部分隐藏 */
            text-overflow: ellipsis;/*溢出用省略号显示 */
            display: inline-block;
            padding-left: 3px;
            //line-height: 16px;
            //height: 16px;
          }
          .fc-time {
            flex-shrink: 0;
            display: inline-block;
            //line-height: 16px;
            //height: 16px;
          }
        }
        .activeLive {
          .fc-content {
            .fc-title {
              position: relative;
              padding-left: 16px;
              &:before {
                content: '';
                position: absolute;
                width: 12px;
                height: 12px;
                background: url("https://img.kaikeba.com/a/11235180101202luuu.gif") 0 0/cover no-repeat;
                top: 1px;
                left: 2px;
              }
            }
          }
        }
      }
    }
    .fc-day-grid-event {
      margin: 2px 2px 0;
    }
  }
  .fc-body{
    border:0!important;
  }
}
</style>
