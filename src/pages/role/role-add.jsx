import React, { Component } from "react";
import { Form, Input } from 'antd'

const Item = Form.Item
export default class RoleAdd extends Component {
    refForm = React.createRef()

    render() {
        return (
            <Form ref={this.refForm}>
                <Item
                    label='角色名称'
                    name='roleName'
                    initialValue=''
                    rules={[
                        { required: true, message: '角色名称必须输入' }
                    ]}
                >
                    <Input placeholder='请输入角色名称' />

                </Item>
            </Form>
        )
    }
}