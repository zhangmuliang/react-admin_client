import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu } from 'antd';

import logo from "../../assets/images/logo.png";
import menuList from "../../config/menuConfig";
import getIconutil from "../../utils/iconUtils";
import './left-nav.less';

const { SubMenu } = Menu;

export default class LeftNav extends Component {
    //根据menu的数据数组生成对应的标签数组
    getMenuNodes = (menuList) => {
        return menuList.map(item => {
            if(!item.children){
                const icon = getIconutil.getIcon(item.icon)
                return (
                    <Menu.Item key={item.key} icon={icon}>
                        <Link to={item.key}>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }
        })
    }

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
                    {/*
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
                    */}

                    {
                        this.getMenuNodes(menuList)
                    }
                </Menu>
            </div>

        )
    }
}