import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './login.less';
import logo from '../../assets/images/logo.png';
import { connect } from 'react-redux'
import { loginAction } from '../../redux/actions'




// 登陆的路由组件
class Login extends Component {
    onFinish = (async (values) => {
        // console.log("提交表单且数据验证成功"+values);
        const { username, password } = values

        this.props.loginAction(username, password)

        // reqLogin(username, password).then(response => {
        //     console.log('请求发送成功',response.data)
        // }).catch(error =>{
        //     console.log('请求发送失败')
        // })
    });

    onFinishFailed = (errorFields) => {
        console.log("提交表单且数据验证失败" + errorFields)
    }

    // 对密码进行验证
    validatePwd = (rule, value) => {
        if (!value) {
            return Promise.reject('请输入密码！');
        } else if (value.length < 4) {
            return Promise.reject('密码至少4位！');
        } else if (value.length > 12) {
            return Promise.reject('密码至多12位！');
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            return Promise.reject('密码必须是英文、 数字或下划线组成！');
        } else {
            return Promise.resolve();
        }
    }

    render() {
        const user = this.props.user
        if (user && user._id) {
            // 自动跳转登录界面
            return <Redirect to='/home' />
        }
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="" />
                    <h1>React后台管理项目</h1>
                </header>
                <section className="login-content">
                    <div className={user.errorMsg ? 'error-msg show' : 'error-msg'}>{user.errorMsg}</div>
                    <h2>用户登录</h2>
                    <Form onFinish={this.onFinish} onFinishFailed={this.onFinishFailed} className="login-form">
                        <Form.Item name="username" initialValue='admin'
                            //声明式验证：直接使用别人定义好的验证规则
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名！',
                                },
                                {
                                    min: 4,
                                    message: '用户名至少4位！',
                                },
                                {
                                    max: 12,
                                    message: '用户名至多12位！',
                                },
                                {
                                    pattern: /^[a-zA-Z0-9_]+$/,
                                    message: '用户名必须是英文、 数字或下划线组成！',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} />
                        </Form.Item>

                        <Form.Item name="password"
                            rules={[
                                {
                                    validator: this.validatePwd,
                                },
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user }),
    { loginAction }
)(Login)