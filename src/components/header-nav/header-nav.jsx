import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import './header-nav.less';
import {formateDate} from "../../utils/dateUtils"
import { reqWeather } from "../../api";

import menuList from "../../config/menuConfig";
import LinkButton from "../link-button/link-button";
import { connect } from "react-redux";
import {logout} from "../../redux/actions"

class HeaderNav extends Component{
    state={
        currentTime: formateDate(Date.now()),
        temperature: '',
        weather: '',
    }

    getTime = () =>{
        this.intervalId = setInterval(()=>{
            const currentTime =  formateDate(Date.now())
            this.setState({currentTime})
        },1000)
    }

    getWeather = async() => {
        const {temperature, weather} = await reqWeather('ab25b0e7bc3870e97bd2a4a2911d580f','110000')
        this.setState({temperature, weather})
    }


    getTitle = () => {
        const path = this.props.location.pathname
        let title
        menuList.forEach(item => {
            if(item.key===path){
                title=item.title
            }else if(item.children){
                const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
                if(cItem){
                    title = cItem.title
                }
            }
        })
        return title
    }

    logout = () =>{
        Modal.confirm({
            title: '确定退出吗？',
            icon: <ExclamationCircleOutlined />,
            okText: "确认",
            cancelText: "取消",
            // content: 'Some descriptions',
            onOk: ()=> {
                this.props.logout()
                this.props.history.replace('/Login')
            },
            onCancel() {
              console.log('取消');
            },
          });
    }

    componentDidMount(){
        this.getTime()
        this.getWeather()
    }

    componentWillUnmount(){
        clearInterval(this.intervalId)
    }

    render () {
        const {currentTime,temperature,weather} = this.state
        const username = this.props.user.username
        const title = this.props.headTitle
        // const title = this.getTitle()
        return (
            <div className="header-nav">
                <div className="header-nav-top">
                    <span>您好，{username}</span>
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-nav-bottom">
                    <div className="header-nav-bottom-left">{title}</div>
                    <div className="header-nav-bottom-right">
                        <span>{currentTime}</span>
                        <span>{temperature}°C</span>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({headTitle: state.headTitle, user:state.user}),
    {logout}
)(withRouter(HeaderNav))