// 包含应用中所有接口请求函数的模块
// 每个接口函数返回值都是promise
// 能根据接口文档定义接口请求
// 需要配置代理解决跨域问题

import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd'

// export function reqLogin(username,password){
//     return ajax('/login',{username,password},'POST')
// }

//登录
export const reqLogin = (username, password) => ajax('/login', { username, password }, 'POST')

//添加用户
export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST')

//天气查询
export const reqWeather = (key,city) => {
    return new Promise((resolve,reject)=>{
        const url = `https://restapi.amap.com/v3/weather/weatherInfo?key=${key}&city=${city}`
        jsonp(url, {}, (error, data)=>{
            if(!error && data.status==="1"){
               const {weather, temperature} = data.lives[0]
               resolve({weather, temperature})
            }else{
                message.error("获取天气信息失败！")
            }
        })
    })
}
// reqWeather('ab25b0e7bc3870e97bd2a4a2911d580f','110000')

//获取分类列表
export const reqCategories = (parentId) => ajax('/manage/category/list', {parentId}, 'GET')

//添加分类
export const reqAddCategories = (parentId,categoryName) => ajax('/manage/category/add', {parentId,categoryName}, 'POST')

//更新分类
export const reqUpdateCategories = (categoryId,categoryName) => ajax('/manage/category/update', {categoryId,categoryName}, 'POST')

//获取分类
export const reqCategoriyName = (categoryId) => ajax('/manage/category/info', {categoryId}, 'GET')

//获取商品分页列表
export const reqProducts = (pageNum,pageSize) => ajax('/manage/product/list', {pageNum,pageSize}, 'GET')

//搜索商品分页列表
export const reqSearchProducts = ({pageNum,pageSize,searchName, searchType}) => ajax('/manage/product/search',{
    pageNum,
    pageSize,
    [searchType]: searchName,
},'GET')

//更新商品状态（上架下架）
export const reqUpdateStatus =  (productId,status) => ajax('/manage/product/updateStatus',{productId,status},'POST')