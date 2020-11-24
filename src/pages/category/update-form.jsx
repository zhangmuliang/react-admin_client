import React, { Component } from "react";
import PropTypes from "prop-types"
import { Form, Input } from "antd"

const Item = Form.Item

export default class UpdateForm extends Component {
    formRef = React.createRef();
    static propTypes = {
        categoryName: PropTypes.string.isRequired
    }

    componentDidUpdate() {
        this.formRef.current.setFieldsValue({
            categoryName: this.props.categoryName,
        });
    }

    render() {
        const {categoryName} = this.props
        return (
            <Form ref={this.formRef}>
                <Item name='categoryName' initialValue={categoryName} >
                    <Input placeholder='请输入分类名称' />
                </Item>
            </Form>
        )
    }
}