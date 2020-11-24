import React, { Component } from "react";
import { Form, Select, Input } from "antd"
import PropTypes from "prop-types"

const Item = Form.Item
const Option = Select.Option
export default class AddForm extends Component {
    static propTypes = {
        categories: PropTypes.array.isRequired,
        parentId: PropTypes.string.isRequired
    }

    formRef = React.createRef();

    componentDidUpdate() {
        this.formRef.current.setFieldsValue({
            categoryName: '',
            parentId: this.props.parentId,
        });
    }

    render() {
        const {categories, parentId} = this.props
        return (
            <Form ref={this.formRef}>
                <Item name="parentId" initialValue={parentId}>
                    <Select>
                        <Option value='0'>一级分类</Option>
                        {
                            categories.map((c,index) => <Option key={index} value={c._id}>{c.name}</Option>)
                        }
                    </Select>
                </Item>

                <Item name='categoryName'> 
                    <Input placeholder='请输入分类名称' />
                </Item>

            </Form>
        )
    }
}