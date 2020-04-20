import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import RouterViews from '../router/RouterViews';
// import axios from 'axios';
import getData from '../api/getData'
import { connect } from 'react-redux';
// import 
class Home extends Component {
    render() {
        return (
            <div className="Home">
                <nav>
                    <NavLink to="/Home/One">One</NavLink>
                    <NavLink to="/Home/Son">Son</NavLink>
                    <NavLink to="/Home/Two">Two</NavLink>
                </nav>
                <RouterViews routes={this.props.children} />
            </div>
        );
    }
    componentDidMount(){
        // axios.get('/app').then(({data})=>{
        //     console.log(data,'data')
        // })
        // console.log(getData)
        this.props.getList(getData)
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = (dispatch)=>{
    return {
        getList:(fn)=>{
            dispatch(fn)
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Home)
// export default Home;