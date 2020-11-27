import React, { Component } from "react";
import { Card, Table, Button, Modal, message } from "antd"
import { reqAddRole, reqRoles, reqUpdateRole } from '../../api'

import { PAGE_SIZE } from "../../utils/constants"
import RoleAdd from "./role-add";
import RoleAuth from "./role-auth"
import memoryUtils from "../../utils/memoryUtils"
import storageUtils from "../../utils/storageUtils"
import {formateDate} from '../../utils/dateUtils'

export default class Role extends Component {

    state = {
        roles: [],
        role: {},
        isShowAdd: false,
        isShowAuth: false,

    }

    constructor(props) {
        super(props)

        this.auth = React.createRef()
    }

    initColum() {
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'name',
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                render: formateDate,
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
                render: (auth_time) => formateDate(auth_time)
            },
            {
                title: '授权人',
                dataIndex: 'auth_name',
            },
        ]
    }

    getRoles = async () => {
        const result = await reqRoles()
        if (result.status === 0) {
            const roles = result.data
            this.setState({
                roles
            })
        }
    }

    onRow = (role) => {
        return {
            onClick: event => {
                this.setState({
                    role
                })
            }
        }
    }

    addRole = () => {
        this.Add.refForm.current.validateFields()
            .then(async values => {
                this.setState({
                    isShowAdd: false
                })
                const { roleName } = values
                const result = await reqAddRole(roleName)
                if (result.status === 0) {
                    message.success('添加角色成功')
                    const role = result.data
                    this.setState(state => ({
                        roles: [...state.roles, role]
                    }))
                }
            }).catch(errinfo => {
                message.error(errinfo)
            })
    }

    updateRole = async () => {
        this.setState({
            isShowAuth: false
        })

        const role = this.state.role
        // 得到最新的menus
        const menus = this.auth.current.getMenus()
        role.menus = menus
        role.auth_time = Date.now()
        role.auth_name = memoryUtils.user.username

        // 请求更新
        const result = await reqUpdateRole(role)
        if (result.status === 0) {
            // 如果当前更新的是自己角色的权限, 强制退出
            if (role._id === memoryUtils.user.role_id) {
                memoryUtils.user = {}
                storageUtils.removeUser()
                this.props.history.replace('/login')
                message.success('当前用户角色权限已修改，请重登')
            } else {
                message.success('设置角色权限成功')
                this.setState({
                    roles: [...this.state.roles]
                })
            }

        }
    }

    componentWillMount() {
        this.initColum()
    }

    componentDidMount() {
        this.getRoles()
    }
    render() {
        const { roles, role, isShowAdd, isShowAuth } = this.state
        const title = (
            <span>
                <Button type='primary' style={{ marginRight: '10px' }} onClick={() => this.setState({ isShowAdd: true })}>创建角色</Button>
                <Button type='primary' disabled={!role._id} onClick={() => this.setState({ isShowAuth: true })}>设置角色权限</Button>
            </span>
        )
        return (
            <Card title={title}>
                <Table
                    rowSelection={{
                        type: 'radio',
                        selectedRowKeys: [role._id],
                        onSelect:(role)=>{
                            this.setState({
                                role
                            })
                        }
                    }}
                    rowKey='_id'
                    bordered
                    dataSource={roles}
                    columns={this.columns}
                    pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true }}
                    onRow={this.onRow}
                />
                <Modal
                    title='添加角色'
                    visible={isShowAdd}
                    onOk={this.addRole}
                    onCancel={() => {
                        this.setState({ isShowAdd: false })
                        this.Add.refForm.current.resetFields()
                    }}
                >
                    <RoleAdd ref={(RoleAdd) => { this.Add = RoleAdd }} />
                </Modal>
                <Modal
                    title='设置角色权限'
                    visible={isShowAuth}
                    onOk={this.updateRole}
                    onCancel={() => {
                        this.setState({ isShowAuth: false })
                    }}
                >
                    <RoleAuth ref={this.auth} role={role} />
                </Modal>
            </Card>
        )
    }
}