// 包含应用中所有接口请求函数的模块
// 每个接口函数返回值都是promise
// 能根据接口文档定义接口请求
// 需要配置代理解决跨域问题

import ajax from './ajax'

// export function reqLogin(username,password){
//     return ajax('/login',{username,password},'POST')
// }

//登录
export const reqLogin = (username, password) => ajax('/login', { username, password }, 'POST')

//添加用户
export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST')
