import React, { Component } from "react";
import { Card, List } from 'antd'
import { ArrowLeftOutlined } from "@ant-design/icons"
import LinkButton from "../../components/link-button/link-button";
import { BASE_IMG_URL } from "../../utils/constants";
import { reqCategoriyName } from "../../api";

const Item = List.Item

export default class ProductDetail extends Component {

    state = {
        cName1: '',
        cName2: '',
    }

    async componentDidMount() {
        let cName1;
        const { pCategoryId, categoryId } = this.props.location.state
        if (pCategoryId === '0') {
            const result = await reqCategoriyName(categoryId)
            if (result.status === 0 && result.data) {
                cName1 = result.data.name
                this.setState({ cName1 })
            }
        } else {
            // const result1 = await reqCategoriyName(pCategoryId)
            // const result2 = await reqCategoriyName(CategoryId)
            // if (result1.status === 0 && result2.status === 0) {
            //     cName1 = result1.data.name
            //     const cName2 = result2.data.name
            //     this.setState({ cName1, cName2 })
            // }
            const results =await Promise.all([reqCategoriyName(pCategoryId),reqCategoriyName(categoryId)])
            console.log(results)
            if(results[0].status===0 && results[1].status===0 && results[0].data && results[1].data){
                cName1 = results[0].data.name
                const cName2 = results[1].data.name
                this.setState({ cName1, cName2 })
            }
        }
    }

    render() {
        const { name, desc, price, detail, imgs } = this.props.location.state
        const { cName1, cName2 } = this.state
        const title = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <ArrowLeftOutlined style={{ color: 'green', marginRight: 15, fontSize: 20 }} />
                </LinkButton>
                <span>商品详情</span>
            </span>
        )
        return (
            <Card title={title} className='product-detail'>
                <List>
                    <Item className='product-list-item'>
                        <span className="left">商品名称:</span>
                        <span>{name}</span>
                    </Item>
                    <Item className='product-list-item'>
                        <span className="left">商品描述:</span>
                        <span>{desc}</span>
                    </Item>
                    <Item className='product-list-item'>
                        <span className="left">商品价格:</span>
                        <span>{price}元</span>
                    </Item>
                    <Item className='product-list-item'>
                        <span className="left">商品分类:</span>
                        <span>{cName1}{cName2 ? '-->' + cName2 : ''}</span>
                    </Item>
                    <Item className='product-list-item'>
                        <span className="left">商品图片:</span>
                        <span>
                            {
                                imgs.map(img => (
                                    <img
                                        key={img}
                                        src={BASE_IMG_URL + img}
                                        className="product-img"
                                        alt="img"
                                    />
                                ))
                            }
                        </span>
                    </Item>
                    <Item className='product-list-item'>
                        <span className="left">商品详情:</span>
                        <span dangerouslySetInnerHTML={{ __html: detail }}></span>
                    </Item>
                </List>
            </Card>
        )
    }
}