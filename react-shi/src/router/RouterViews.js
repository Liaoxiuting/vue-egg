import React, { Component } from 'react';
import {Switch,Redirect,Route} from 'react-router-dom'
class RouterViews extends Component {
    render() {
        let {routes} =this.props;
        let redirectArr=routes.filter(v=>v.redirect)
        let RedirectS=redirectArr.map((v,i)=>{
            return <Redirect key={i} from={v.path} to={v.redirect}/>
        })
        routes=routes.filter(v=>!v.redirect)
        return (
            <Switch>
                {  
                    routes.map((v,i)=>{
                        return <Route key={i} path={v.path} render={(props)=>{
                            return <>
                                    {v.children&&
                                    <v.component children={v.children} {...props}/>
                                    }
                                    {!v.children&&
                                    <v.component {...props}/>
                                    }
                                    </>
                        }} />
                    })
                }
                {RedirectS.length!==0&&RedirectS}
            </Switch>
        );
    }
}

export default RouterViews;