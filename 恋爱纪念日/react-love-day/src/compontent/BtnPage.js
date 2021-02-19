import React, { Component } from 'react';

class BtnPage extends Component {
  constructor(props){
    super(props)
    this.state={
      pageUp:false,
      pageDown:{
        flag:true,
        path:'/' 
      }
    }
  }
  componentWillMount(){
    let props=this.props
    this.setState({
      pageUp:props.pageUp,
      pageDown:props.pageDown
    })
  }
  pageUpFn(){
    this.props.history.go(-1)
  }
  pageDownFn(){
    let pageDown=this.props.pageDown
    console.log(pageDown,'pageDown', this.props)
    this.props.history.push({pathname:pageDown.path,query:pageDown.query })
  }
  render() {
    return (
      <div className="BtnPage">
      {this.props.pageUp&&
        <p className="up" onClick={this.pageUpFn.bind(this)}>
        上一页
        </p>
      }
      {this.props.pageDown.flag&&
        <p className="down" onClick={this.pageDownFn.bind(this)}>
        下一页
        </p>
      }
      </div>
    );
  }
}

export default BtnPage;
