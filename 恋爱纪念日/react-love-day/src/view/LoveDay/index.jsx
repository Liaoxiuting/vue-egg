import React, { Component } from 'react'
import BtnPage from '../../compontent/BtnPage.js'
import './index.css'
export default class componentName extends Component {

  constructor(){
    super()
    this.state={
      // calendarMain:['日','一','二','三','四','五','六'],
      // selectedYear: new Date().getFullYear(),
      // selectedMonth: new Date().getMonth(),
      // selectedDate: new Date().getDate(),
      // totalCalendarList:null,
    }
  }

  componentWillMount(){
    console.log(this,'this')
  }

  render() {
    return (
      <div className="loveday">
        <div className="calendar">
          <div className="calendar_son">
            
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
}
