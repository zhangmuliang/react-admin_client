import React, { Component } from "react";
import { Link } from "react-router-dom"
import { Menu } from 'antd';
import {
    AppstoreOutlined,
    PieChartOutlined,
} from '@ant-design/icons';

import logo from "../../assets/images/logo.png"
import './left-nav.less'

const { SubMenu } = Menu;

export default class LeftNav extends Component {

    render() {
        return (
            <div className="left-nav">
                <Link to='/home' className="left-nav-header">
                    <img src={logo} alt="logo" />
                    <h1>小张后台</h1>
                </Link>

                <Menu
                    defaultSelectedKeys={['/home']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                >
                    <Menu.Item key="/home" icon={<PieChartOutlined />}>
                        <Link to='/home'>
                            <span>首页</span>
                        </Link>
                    </Menu.Item>

                    <SubMenu key="sub1" icon={<AppstoreOutlined />} title="商品">
                        <Menu.Item key="/category" icon={<AppstoreOutlined />}>
                            <Link to='/category'>
                                <span>品类管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/product" icon={<AppstoreOutlined />}>
                            <Link to='/product'>
                                <span>商品管理</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>

                    <Menu.Item key="/user" icon={<PieChartOutlined />}>
                        <Link to='/user'>
                            <span>用户管理</span>
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="/role" icon={<PieChartOutlined />}>
                        <Link to='/role'>
                            <span>角色管理</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </div>

        )
    }
}