import React, { Component } from "react";
import { Link, withRouter} from "react-router-dom";
import { Menu } from 'antd';

import logo from "../../assets/images/logo.png";
import menuList from "../../config/menuConfig";
import getIconutil from "../../utils/getIconUtils";
import './left-nav.less';

const { SubMenu } = Menu;

class LeftNav extends Component {
    //根据menu的数据数组生成对应的标签数组
    getMenuNodes = (menuList) => {
        const path = this.props.location.pathname;
        //map方式，还有一种reduce方式
        return menuList.map(item => {
            const icon = getIconutil.getIcon(item.icon)
            if (!item.children) {
                return (
                    <Menu.Item key={item.key} icon={icon}>
                        <Link to={item.key}>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
                if(cItem) {
                    this.openKey = item.key
                }
                return (
                    <SubMenu key={item.key} icon={icon} title={item.title}>
                        {/* 递归调用 */}
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })
    }

    componentWillMount(){
        this.menuNodes = this.getMenuNodes(menuList)
    }

    render() {
        let path = this.props.location.pathname;
        if(path.indexOf('/product')===0){
            path = '/product'
        }
        const openkey = this.openKey
        return (
            <div className="left-nav">
                <Link to='/home' className="left-nav-header">
                    <img src={logo} alt="logo" />
                    <h1>小张后台</h1>
                </Link>

                <Menu
                    selectedKeys={[path]}
                    defaultOpenKeys={[openkey]}
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
                        this.menuNodes
                    }
                </Menu>
            </div>

        )
    }
}

export default withRouter(LeftNav)