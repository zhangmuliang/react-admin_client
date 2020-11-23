import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Layout } from 'antd';

import memoryUtils from "../../utils/memoryUtils";
import LeftNav from "../../components/left-nav/left-nav";
import HeaderNav from "../../components/header/header-nav";

const { Footer, Sider, Content } = Layout;

// 后台管理的路由组件
export default class Admin extends Component {

    render() {
        const user = memoryUtils.user
        if (!user || !user._id) {
            // 自动跳转登录界面
            return <Redirect to='/Login' />
        }
        return (
            <Layout style={{ height: "100%" }}>
                <Sider>
                    <LeftNav />
                </Sider>
                <Layout>
                    <HeaderNav />
                    <Content style={{ backgroundColor: "black" }}>Content</Content>
                    <Footer style={{ textAlign: "center", color: "#ccc" }}>推荐使用火狐浏览器，可以获得最佳页面体验效果</Footer>
                </Layout>
            </Layout>
        )
    }
}