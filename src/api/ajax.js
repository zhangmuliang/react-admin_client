// 发送异步ajax请求的函数模块
// 封装axios库
// 函数的返回值式promise对象
// 优化：统一处理请求异常

import { message } from 'antd';
import axios from 'axios';


export default function ajax(url, data={}, type='GET'){

    return new Promise((resolve,reject) => {
        let promise;
        // 执行ajax请求
        if(type==='GET'){
            promise = axios.get(url,{
                param: data
            })
        }else{
            promise = axios.post(url, data)
        }
        // 成功处理
        promise.then(response => {
            resolve(response.data)
        }).catch(error => {
            message.error('请求出错了：'+ error.message)
        })
    })
}

// ajax('/login',{username:'tom',password:'123456'},'POST').then()