import React, { Component } from 'react';
import { connect } from 'react-redux';

class Zhi extends Component {
    state = {
        con: this.props.itm.count
    }
    render() {
        // console.log(this.props.itm)
        return (
            <div className="zhi">
                <p onClick={()=>{
                    console.log(this.props.luyou.history.push('/Detail/'+this.props.itm.id))
                    // this.props.history.push('/Detail/'+this.props.itm.id)
                }}>
                    {this.props.itm.name}
                </p>
                <button onClick={() => {
                    if (this.state.con > 0) {
                        this.state.con--
                    } else {

                        this.state.con = 0
                    }
                    let obj = {
                        name: this.props.itm.name, 
                        falg: this.props.itm.falg,
                        count: this.state.con,
                        id: this.props.itm.id
                    }
                    this.props.jiajian(obj)
                    this.setState({})
                }}>-</button>
                <p>
                    {this.state.con}
                </p>
                <button onClick={() => {
                    this.state.con++
                    this.setState({})
                    let obj = {
                        name: this.props.itm.name, 
                        falg: this.props.itm.falg,
                        count: this.state.con,
                        id: this.props.itm.id
                    }
                    this.props.jiajian(obj)
                }}>+</button>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => {
    return {
        jiajian: (obj) => {
            dispatch({ type: "GAI", obj })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Zhi);