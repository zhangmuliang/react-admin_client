import React, { Component } from "react";
import { Card, Form, Input, Cascader, Button, message } from 'antd';
import LinkButton from "../../components/link-button/link-button";
import { ArrowLeftOutlined } from '@ant-design/icons'
import { reqCategories, reqAddOrUpdateProduct } from "../../api";
import PicturesWall from "./product-pictures-wall";
import RichText from "./product-rich-text";

const { Item } = Form
const { TextArea } = Input


export default class ProductAddUpdate extends Component {
    state = {
        optionLists: [],
    }
    constructor(props) {
        super(props)
        this.pw = React.createRef()
        this.edit = React.createRef()
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
        const { pCategoryId } = product

        if (isUpdate && pCategoryId !== "0") {
            const subCategories = await this.getCategories(pCategoryId)

            const childOptionLists = subCategories.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true,
            }))
            const targetOption = optionLists.find(option => option.value === pCategoryId)
            console.log(targetOption)
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
            .then(async values => {
                const { name, desc, price, categoryIds } = values
                let pCategoryId, categoryId
                if (categoryIds.length === 1) {
                    pCategoryId = '0'
                    categoryId = categoryIds[0]
                } else {
                    pCategoryId = categoryIds[0]
                    categoryId = categoryIds[1]
                }
                const imgs = this.pw.current.getImgs()
                const detail = this.edit.current.getDetail()
                const product = { name, desc, price, imgs, detail, pCategoryId, categoryId }
                if (this.isUpdate) {
                    product._id = this.product._id
                }
                const result = await reqAddOrUpdateProduct(product)
                console.log(result,product)
                if (result.status === 0) {
                    message.success(`${this.isUpdate ? '更新' : '添加'}商品成功`)
                    this.props.history.goBack()
                } else {
                    message.error(`${this.isUpdate ? '更新' : '添加'}商品失败`)
                }
            }).catch(errinfo => {
                alert('提交失败'+errinfo)
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
        const { pCategoryId, categoryId, imgs, detail } = product
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
                    <Item label='商品分类：' name='categoryIds' initialValue={categoryIds}>
                        <Cascader
                            placeholder='请选择商品分类'
                            options={this.state.optionLists}
                            loadData={this.loadData}
                        />
                    </Item>
                    <Item label='商品图片：'>
                        <PicturesWall ref={this.pw} imgs={imgs} />
                    </Item>
                    <Item label='商品详情：' labelCol={{ span: 2 }} wrapperCol={{ span: 18 }}>
                        <RichText ref={this.edit} detail={detail} />
                    </Item>
                    <Item>
                        <Button type="primary" onClick={this.submit}>提交</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}