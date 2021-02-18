import logo from '../logo.svg';
import React, { Component } from 'react';
import {yyyymmddhhmmss} from '../utlis/DateFormat.js'
import './love.css'
import BtnPage from '../compontent/BtnPage.js'
class love extends Component {
  constructor(props){
    super(props)
    this.state={
      timer:null,
      startDate:'2020-11-07 05:20:00',//开始恋爱啦
      toDay:new Date().getTime(),//今天啦
      differDay:'',// 我们已经是恋爱好久的老夫老妻啦
    }
  }
  longLove(){
    this.setState({
      differDay:Math.floor((new Date().getTime()-new Date('2020-11-07 05:20:00').getTime())/(24 * 3600 * 1000))
    })
    
  }
  heartbeat(){// 心跳 
    this.setState({
      toDay:yyyymmddhhmmss(new Date())
    })
  }
  componentDidMount(){//渲染
    this.heartbeat()
    this.timer= setInterval(()=>{
      this.heartbeat()
    },1000)
    this.longLove()
  }
  componentWillUnmount(){//卸载
    clearInterval(this.timer)
  }
  render() {
    let startDate=this.state.startDate
    let toDay=this.state.toDay
    let differDay=this.state.differDay
    return (
      <div className="love">
        <img src={logo} className="Love-logo" alt="logo" />
        <h5>走过了人间四季,也看过了日出日落,觉得还是两个人在一起的春夏秋冬更让人觉得珍贵。</h5>
        <h2>{startDate}</h2>
        <h2>{toDay}</h2>
        <h2>{differDay}天</h2>
        <BtnPage history={this.props.history} pageUp={false} pageDown={
          {flag:true,
           path:'/loveday',
           query:{
             id:'598599'
           }
          }
        }/>
      </div>
    );
  }
}

export default love;
