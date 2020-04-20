import React, { Component } from 'react';
import { connect } from 'react-redux';
import Zhi from './Son/Zhi';
// import axios from 'axios';

class Son extends Component {
    state={
        sonData:[]
    }
    render() {
        console.log(this.props)
        return (
            <div className="son">
                {this.state.sonData.length!==0&&
                    this.state.sonData.map(v=>{
                        return <Zhi key={v.id} itm={v} luyou={this.props}/>
                    })
                }
            </div>
        );
    }
    componentDidMount(){
        // axios.get('/app').then(({data})=>{
        //     console.log(data,'data')
        // })
        // console.log(this.props.data)
        this.setState({
            sonData:this.props.data
        })
    }
}
const mapStateToProps = (state) => {
    return {
        data:state.reduceOne
    }
}

const mapDispatchToProps = {
    
}


export default connect(mapStateToProps,mapDispatchToProps)(Son);