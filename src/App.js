// 应用的根组件
import React, { Component } from "react";
// import { message, Button } from 'antd';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/login/login.jsx'
import Admin from './pages/admin/admin.jsx'

export default class App extends Component {
    // handleClick = () => {
    //     message.success('成功啦');
    // }
    // render() {
    //     return <Button type="primary" onClick={this.handleClick}>测试antd</Button>;
    // }
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/Login' component={Login}></Route>
                    <Route path='/' component={Admin}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}
