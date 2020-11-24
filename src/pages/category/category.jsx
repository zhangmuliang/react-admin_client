import React, { Component } from "react";
import { Button, Card, message, Table, Modal } from "antd"
import { PlusOutlined, ArrowRightOutlined } from "@ant-design/icons"

import LinkButton from "../../components/link-button/link-button";
import { reqAddCategories, reqCategories, reqUpdateCategories } from "../../api";
import AddForm from "./add-form";
import UpdateForm from "./update-form";

export default class Category extends Component {
    state = {
        loading: false,
        categories: [],
        subCategories: [],
        parentId: '0',
        parentName: '',
        showStatus: 0, //表示确认框是否显示
    }

    initColums = () => {
        this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                width: 300,
                render: (category) => (
                    <span>
                        <LinkButton onClick={() => this.showUpdate(category)}>修改分类</LinkButton>
                        {this.state.parentId === "0" ? <LinkButton onClick={() => { this.showSubCategories(category) }}>查看子分类</LinkButton> : null}
                    </span>
                ),
            },
        ];
    }

    getCategories = async () => {
        this.setState({ loading: true })
        const { parentId } = this.state
        const result = await reqCategories(parentId)
        this.setState({ loading: false })
        if (result.status === 0) {
            const categories = result.data
            if (parentId === '0') {
                this.setState({ categories })
            } else {
                this.setState({ subCategories: categories })
            }
        } else {
            message.error("获取分类列表失败。")
        }
    }

    showSubCategories = (category) => {
        this.setState({
            parentId: category._id,
            parentName: category.name
        }, () => {
            this.getCategories()
        })
    }

    showCategories = () => {
        this.setState({
            parentId: '0',
            parentName: '',
            subCategories: []
        }, () => {
            this.getCategories()
        })
    }

    handleCancel = () => {
        this.setState({
            showStatus: 0
        })
    }

    showAdd = () => {
        this.setState({
            showStatus: 1
        })
    }

    showUpdate = (category) => {
        this.category = category
        this.setState({
            showStatus: 2
        })
    }
    //添加分类
    addCategory = async () => {
        this.setState({
            showStatus: 0
        })

        const {parentId,categoryName} = this.AddFormRef.formRef.current.getFieldsValue()
        // console.log(this.AddFormRef.formRef.current.getFieldsValue())
        const result = await reqAddCategories(parentId,categoryName)
        if(result.status===0){
            this.getCategories()
        }else{
            message.error(result.msg)
        }
    }

    //更新分类
    updateCategory = async ()=>{
        this.setState({
            showStatus: 0
        })
        const categoryId = this.category._id
        const {categoryName} = this.UpdateFormRef.formRef.current.getFieldsValue()
        const result = await reqUpdateCategories(categoryId,categoryName)
        if(result.status===0){
            this.getCategories()
        }else{
            message.error(result.msg)
        }
    }

    componentWillMount() {
        this.initColums();
    }

    componentDidMount() {
        this.getCategories()
    }

    render() {
        const { categories, loading, subCategories, parentId, parentName,showStatus } = this.state
        const category = this.category || {name:""}
        const title = parentId === '0' ? '一级分类列表' : (
            <span>
                <LinkButton onClick={() => { this.showCategories() }}>一级分类列表</LinkButton>
                <ArrowRightOutlined style={{ marginRight: "5px" }} />
                <span>{parentName}</span>
            </span>
        )
        const extra = (
            <Button type='primary' onClick={this.showAdd}>
                <PlusOutlined />
                <span>新建分类</span>
            </Button>
        )

        return (
            <Card title={title} extra={extra}>
                <Modal
                    title="添加分类"
                    visible={showStatus===1}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}
                >
                    <AddForm 
                    categories={categories} 
                    parentId={parentId}
                    ref={(formRef) => {this.AddFormRef = formRef}}
                    />
                </Modal>
                <Modal
                    title="更新分类"
                    visible={showStatus===2}
                    onOk={this.updateCategory}
                    onCancel={this.handleCancel}
                >
                    <UpdateForm 
                    categoryName={category.name} 
                    ref={(formRef) => {this.UpdateFormRef = formRef}}
                    />
                </Modal>
                <Table
                    loading={loading}
                    rowKey='_id'
                    bordered
                    dataSource={parentId === "0" ? categories : subCategories}
                    columns={this.columns}
                    pagination={{ defaultPageSize: 5, showQuickJumper: true }}
                />;
            </Card>
        )
    }
}