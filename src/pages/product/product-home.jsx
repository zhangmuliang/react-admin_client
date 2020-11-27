import React, { Component } from "react";
import { Card, Select, Input, Button, Table, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import LinkButton from "../../components/link-button/link-button";
import { reqProducts, reqSearchProducts, reqUpdateStatus } from "../../api";
import { PAGE_SIZE } from "../../utils/constants";


const Option = Select.Option

export default class ProductHome extends Component {

    state = {
        total: 0,
        products: [],
        loading: false,
        searchName: '',
        searchType: 'productName',
    }

    initColums = () => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: (price) => {
                    return "￥" + price
                }
            },
            {
                title: '状态',
                width: 100,
                // dataIndex: 'status',
                render: (product) => {
                    const { status, _id } = product
                    return (
                        <span>
                            <Button
                                type="primary"
                                onClick={() => this.updateStatus(_id, status === 1 ? 2 : 1)}
                            >
                                {status === 1 ? '下架' : '上架'}
                            </Button>
                            <span>{status === 1 ? '在售' : '已下架'}</span>
                        </span>
                    )
                }
            },
            {
                title: '操作',
                width: 100,
                render: (products) => (
                    <span>
                        <LinkButton onClick={() => this.props.history.push('/product/detail', products)}>详情</LinkButton>
                        <LinkButton onClick={() => this.props.history.push('/product/addupdate',products)}>修改</LinkButton>
                    </span>
                ),
            },

        ]
    }


    getProducts = async (pageNum) => {
        this.pageNum = pageNum
        this.setState({ loading: true })

        const { searchName, searchType } = this.state
        let result;
        if (searchName) {
            result = await reqSearchProducts(pageNum, PAGE_SIZE, searchName, searchType)
        } else {
            result = await reqProducts(pageNum, PAGE_SIZE)
        }
        this.setState({ loading: false })
        if (result.status === 0) {
            const { total, list } = result.data
            this.setState({
                total: total,
                products: list,
            })
        }
    }

    updateStatus = async (productId,status) => {
        const result = await reqUpdateStatus(productId,status)
        if(result.status===0){
            message.success('更新商品成功')
            this.getProducts(this.pageNum)
        }
    }

    componentWillMount() {
        this.initColums()
    }

    componentDidMount() {
        this.getProducts(1)
    }

    render() {
        const { products, total, loading, searchName, searchType } = this.state

        const title = (
            <span>
                <Select value={searchType} onChange={value => this.setState({ searchType: value })}>
                    <Option value='productName'>按名称搜索</Option>
                    <Option value='productDesc'>按描述搜索</Option>
                </Select>
                <Input
                    placeholder="请输入关键字"
                    style={{
                        width: "150px",
                        margin: "0 15px"
                    }}
                    value={searchName}
                    onChange={event => this.setState({ searchName: event.target.value })}

                />
                <Button type="primary" onClick={() => this.getProducts(1)}>搜索</Button>
            </span>
        )

        const extra = (
            <Button type="primary" onClick={() => this.props.history.push('/product/addupdate')}>
                <PlusOutlined />
                添加商品
            </Button>
        )
        return (
            <Card title={title} extra={extra}>
                <Table
                    loading={loading}
                    bordered
                    rowKey='_id'
                    dataSource={products}
                    columns={this.columns}
                    pagination={{
                        current:this.pageNum,
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                        total: total,
                        onChange: (pageNum) => { this.getProducts(pageNum) }
                    }}
                />
            </Card>
        )
    }
}