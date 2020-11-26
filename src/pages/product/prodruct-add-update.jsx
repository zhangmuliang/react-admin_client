import React, { Component } from "react";
import { Card, Form, Input, Cascader, Button, Upload } from 'antd';
import LinkButton from "../../components/link-button/link-button";
import { ArrowLeftOutlined } from '@ant-design/icons'
import { reqCategories } from "../../api";
import PicturesWall from "./product-pictures-wall";

const { Item } = Form
const { TextArea } = Input


export default class ProductAddUpdate extends Component {
    state = {
        optionLists: [],
    }
    constructor (props) {
        super(props)
        this.pw = React.createRef()
    }

    initOptions = async (categories) => {
        const optionLists = categories.map(c => (
            {
                value: c._id,
                label: c.name,
                isLeaf: false,
            }
        ))

        const { isUpdate, product } = this
        const { pCategoryId, categoryId } = product
        if (isUpdate && pCategoryId !== "0") {
            const subCategories = await this.getCategories(pCategoryId)
            const childOptionLists = subCategories.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true,
            }))
            const targetOption = optionLists.find(option => option.value === pCategoryId)
            targetOption.children = childOptionLists
        }

        this.setState({
            optionLists
        })
    }

    getCategories = async (parentId) => {
        const result = await reqCategories(parentId)
        if (result.status === 0) {
            const categories = result.data
            if (parentId === '0') {
                this.initOptions(categories)
            } else {
                return categories
            }

        }
    }

    formRef = React.createRef();
    submit = () => {
        this.formRef.current.validateFields()
            .then(values => {
                console.log(values)
                console.log(this.pw.current.getImgs())
            }).catch(errinfo => {
                alert('提交失败')
            })
    }


    validatePrice = (rule, value) => {
        if (value * 1 > 0) {
            return Promise.resolve()
        } else {
            return Promise.reject('价格必须大于0')
        }
    }

    loadData = async selectedOptions => {
        const targetOption = selectedOptions[0];
        targetOption.loading = true;

        const subCategories = await this.getCategories(targetOption.value)
        targetOption.loading = false;
        if (subCategories && subCategories.length > 0) {
            const childOptionLists = subCategories.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true,
            }))
            targetOption.children = childOptionLists
        } else {
            targetOption.isLeaf = true
        }

        // load options lazily

        this.setState({
            optionLists: [...this.state.optionLists]
        });
    };

    componentDidMount() {
        this.getCategories('0');
    }

    componentWillMount() {
        const product = this.props.location.state
        this.isUpdate = !!product
        this.product = product || {}
    }

    render() {
        const { isUpdate, product } = this
        const { pCategoryId, categoryId,imgs } = product
        const categoryIds = []
        if (isUpdate) {
            if (pCategoryId === '0') {
                categoryIds.push(categoryId)
            } else {
                categoryIds.push(pCategoryId)
                categoryIds.push(categoryId)
            }
        }
        const title = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <ArrowLeftOutlined />
                </LinkButton>
                <span>{isUpdate ? '修改商品' : '添加商品'}</span>
            </span>
        )

        const formItemLayout = {
            labelCol: { span: 2 }, //左侧label宽度
            wrapperCol: { span: 8 },
        }

        return (
            <Card title={title}>
                <Form {...formItemLayout} ref={this.formRef}>
                    <Item
                        label='商品名称：'
                        name='name'
                        initialValue={product.name}
                        rules={[
                            {
                                required: true,
                                message: '必须输入商品名称'
                            }
                        ]}
                    >
                        <Input placeholder='请输入商品名称' />
                    </Item>
                    <Item
                        label='商品描述：'
                        name='desc'
                        initialValue={product.desc}
                        rules={[
                            {
                                required: true,
                                message: '必须输入商品描述'
                            }
                        ]}
                    >
                        <TextArea placeholder='请输入商品描述' autoSize={{ minRows: 2, maxRows: 6 }} />
                    </Item>
                    <Item
                        label='商品价格：'
                        name='price'
                        initialValue={product.price}
                        rules={[
                            {
                                required: true,
                                message: '必须输入商品描述'
                            },
                            {
                                validator: this.validatePrice,
                            }
                        ]}>
                        <Input type='number' placeholder='请输入商品价格' addonAfter="元" />
                    </Item>
                    <Item label='商品分类：' name='categoryIds'>
                        <Cascader
                            placeholder='请选择商品分类'
                            options={this.state.optionLists}
                            loadData={this.loadData}
                        />
                    </Item>
                    <Item label='商品图片：'>
                        <PicturesWall ref={this.pw} imgs={imgs}/>
                    </Item>
                    <Item label='商品详情：'>
                        <Input placeholder='请输入商品名称' />
                    </Item>
                    <Item>
                        <Button type="primary" onClick={this.submit}>提交</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}