import React, { Component } from 'react'
import BtnPage from '../../compontent/BtnPage.js'
import {hundredDay} from '../../utlis/DateFormat.js'
import './index.css'
export default class componentName extends Component {

  constructor(){
    super()
    this.state={
      calendarMain:['日','一','二','三','四','五','六'],
      daysInMonth:[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      Year: new Date().getFullYear(),//当前年份
      Month: new Date().getMonth(),//当前月份
      Day: new Date().getDate(),//当前日
    }
  }
  // 生命周期  在render之前调用    可以在服务端被调用，也可以在浏览器端被调用
  componentWillMount(){
    this.daysInMonthFn()//  判断闰年 2月份是28天还是29天
  }
  render() {
    return (
      <div className="loveday">
        <div className="calendar">
          <div className="calendar_son">
            <div className="calendar_year_month">
              <span>
                <b>{
                  this.state.Year
                }</b>
                年
              </span>
              <span>
                <b>{
                  this.state.Month+1
                }</b>
                月
              </span>
            </div>
            <div className="calendar_huan">
              <span onClick={this.upYear.bind(this)}>上一年</span>
              <span onClick={this.upMonth.bind(this)}>上一月</span>
              <span onClick={this.goToDay.bind(this)}>今天</span>
              <span onClick={this.downMonth.bind(this)}>下一月</span>
              <span onClick={this.downYear.bind(this)}>下一年</span>
            </div>
            <div className="calendar_nav">
              {this.state.calendarMain.length!==0&&
                this.state.calendarMain.map(item=>{
                return <p key={item}>{item}</p>
                })
              }
            </div>
            <div className="calendar_day">
              {
                this.UpMonthDays().length!==0&&
                this.UpMonthDays().map(item=>{
                  return <div className={item.classNames} key={item.id} onClick={this.clickToDay.bind(this,item)}>{item.day}
                    {item.anniversaryFlag&&
                    <span>
                      {item.anniversary}天
                    </span>}
                  </div>
                })
              }
              {this.MonthDays().days!==0&&
                this.MonthDays().dayArr.map(item=>{
                  return <div className={item.classNames} key={item.id} onClick={this.clickToDay.bind(this,item)}>{item.day}
                    {item.anniversaryFlag&&
                    <span>
                      {item.anniversary}天
                    </span>}
                  </div>
                })
              }
              {this.DownMonthDays()!==0&&
                this.DownMonthDays().map(item=>{
                  return <div className={item.classNames} key={item.id} onClick={this.clickToDay.bind(this,item)}>{item.day}
                    {item.anniversaryFlag&&
                    <span>
                      {item.anniversary}天
                    </span>}
                  </div>
                })
              }
            </div>
          </div>
        </div>
        <BtnPage 
        history={this.props.history} 
        pageUp={true} 
        pageDown={{flag:false,
          path:'/loveday',
          query:{
            id:'598599'
          }
        }}/>
      </div>
    )
  }
  // 生命周期  在render之后调用   只能在浏览器端被调用，在服务器端使用react的时候不会被调用
  componentDidMount(){
  }

  //操作方法====⬇️

  goToDay(){
    let _this=this
    this.setState({
      Year: new Date().getFullYear(),//当前年份
      Month: new Date().getMonth(),//当前月份
      Day: new Date().getDate(),//当前日
    },()=>{
      _this.daysInMonthFn()//  判断闰年 2月份是28天还是29天
    })
  }
  upYear(){//上一年
    let _this=this
    let year=this.state.Year
      year--
    this.setState({
      Year:year,
    },()=>{
      _this.daysInMonthFn()//  判断闰年 2月份是28天还是29天
    })
  }
  downYear(){//下一年
    let _this=this
    let year=this.state.Year
      year++
    this.setState({
      Year:year,
    },()=>{
      _this.daysInMonthFn()//  判断闰年 2月份是28天还是29天
    })
  }
  upMonth(){//上一月
    let _this=this
    let year=this.state.Year
    if (this.state.Month-1<0) {
      year--
    }
    let month=this.monthCount(this.state.Month-1)
    this.setState({
      Year:year,
      Month:month
    },()=>{
      _this.daysInMonthFn()//  判断闰年 2月份是28天还是29天
    })
  }
  downMonth(){//下一月
    let _this=this
    let year=this.state.Year
    if (this.state.Month+1>11) {
      year++
    }
    let month=this.monthCount(this.state.Month+1)
    this.setState({
      Year:year,
      Month:month
    },()=>{
      _this.daysInMonthFn()//  判断闰年 2月份是28天还是29天
    })
  }

  clickToDay(item){//点击某天
    console.log(item)
  }
  
  anniversaryFn(date){// 计算百天日
    let anniversary=0
    let anniversaryFlag=false
    if (hundredDay(date)%100===0) {
      anniversary=hundredDay(date)
      anniversaryFlag=true
    }
    return {
      anniversary,
      anniversaryFlag
    }
  }
  randomID(Year,Month,Day){//随机数Id
    let count=Math.ceil(Math.random()*2)
    return Math.ceil(Math.random()*count)+new Date(Year,Month,Day).getTime()
  }
  monthCount(month){//计算月
    if (month<0) {
      return 11
    }else{
      return month>11?0:month
    }
  }
  UpMonthDays(){//当前需要展示的 上月哪几天数
    let {Year,Month,daysInMonth} = this.state
    let targetDay = new Date(Year, this.monthCount(Month), 1).getDay();
    let dayArr=[]
    let count=0
    for (let index = 0; index < targetDay; index++) {
      let date=Year+'-'+(this.monthCount(Month-1)+1)+'-'+(daysInMonth[this.monthCount(Month-1)]-count)
      let ToDay=this.anniversaryFn(date)
      dayArr.push({
        day:daysInMonth[this.monthCount(Month-1)]-count,
        id:this.randomID(Year,this.monthCount(Month-1),daysInMonth[this.monthCount(Month-1)]-count),
        classNames:'up_month calendar_day_son',
        date,
        ...ToDay
      })
      count++
    }
    return dayArr.reverse()
  }
  MonthDays(){//当月天数
    let {Year,Month,daysInMonth} = this.state
    let days=daysInMonth[Month];
    let dayArr=[]
    for (let index = 0; index < days; index++) {
      let date=Year+'-'+(Month+1)+'-'+(index+1)
      let ToDay=this.anniversaryFn(date)
      dayArr.push({
        day:index+1,
        id:this.randomID(Year,Month,index+1),
        classNames:'same_month calendar_day_son',
        date,
        ...ToDay
      })
    }
    return {days,dayArr}
   }
   DownMonthDays(){//当前需要展示的 下月哪几天数
    let {Year,Month,daysInMonth} = this.state
    let targetDay = new Date(Year, this.monthCount(Month+1), 1).getDay();
    let dayArr=[]
    for (let index = 0; index < 7-targetDay; index++) {
      let date=Year+'-'+(this.monthCount(Month+1)+1)+'-'+(index+1)
      let ToDay=this.anniversaryFn(date)
      dayArr.push({
        day:index+1,
        id:this.randomID(Year,this.monthCount(Month+1),index),
        classNames:'down_month calendar_day_son',
        date,
        ...ToDay
      })
    }
    return dayArr
   }
   daysInMonthFn(){    //  判断闰年 2月份是28天还是29天
    let {Year,daysInMonth} = this.state
     if ((Year%4===0&&Year%100!==0)||Year%400===0) {
       daysInMonth[1]=29
       this.setState({
         daysInMonth,
       })
     }
     this.UpMonthDays()
     this.MonthDays()
     this.DownMonthDays()
   }
}
