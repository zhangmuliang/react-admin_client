import React, { Component } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { Layout } from 'antd';


import LeftNav from "../../components/left-nav/left-nav";
import HeaderNav from "../../components/header-nav/header-nav";
import Home from "../home/home";
import Category from "../category/category";
import Product from "../product/product";
import Role from "../role/role";
import User from "../user/user";
import Bar from "../charts/bar";
import Line from "../charts/line";
import Pie from "../charts/pie";
import NotFound from "../not-found/not-found"
import { connect } from "react-redux"

const { Footer, Sider, Content } = Layout;

// 后台管理的路由组件
class Admin extends Component {

    render() {
        const user = this.props.user
        if (!user || !user._id) {
            // 自动跳转登录界面
            return <Redirect to='/Login' />
        }
        return (
            <Layout style={{ minHeight: "100%" }}>
                <Sider>
                    <LeftNav />
                </Sider>
                <Layout>
                    <HeaderNav />
                    <Content style={{ margin: 20, backgroundColor: "#fff" }}>
                        <Switch>
                            <Redirect exact={true} from='/' to='/home' />
                            <Route path='/home' component={Home} />
                            <Route path='/category' component={Category} />
                            <Route path='/product' component={Product} />
                            <Route path='/role' component={Role} />
                            <Route path='/user' component={User} />
                            <Route path='/charts/bar' component={Bar} />
                            <Route path='/charts/line' component={Line} />
                            <Route path='/charts/pie' component={Pie} />
                            <Route component={NotFound} />

                        </Switch>
                    </Content>
                    <Footer style={{ textAlign: "center", borderTop: "1px solid gray", color: "#777" }}>推荐使用火狐浏览器，可以获得最佳页面体验效果</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default connect(
    state => ({ user: state.user }),
    {}
)(Admin)