import React, { Component } from "react";
import {Redirect, Route, Switch} from 'react-router-dom';
import ProductAddUpdate from "./prodruct-add-update";
import productDetail from "./product-detail";
import ProductHome from "./product-home";

import './product.less'
export default class Product extends Component{

    render () {
        return (
            <Switch>
                <Route exact path='/product' component={ProductHome}/>
                <Route path='/product/addupdate' component={ProductAddUpdate}/>
                <Route path='/product/detail' component={productDetail}/>
                <Redirect to='/product' />
            </Switch>
        )
    }
}