//包含n个action creator函数的模块
//同步：对象{type:'',data:数据值}
//异步：函数 dispatch={}
import { message } from "antd"
import { reqLogin } from "../api"
import storageUtils from "../utils/storageUtils"
import { SET_HEAD_TITLE, RECEIVE_USER,SHOW_ERROR_MSG,RESET_USER } from "./action-types"

export const setHeadTitle = (headTitle) => ({ type: SET_HEAD_TITLE, data: headTitle })

export const receiveUser = (user) => ({ type: RECEIVE_USER, user })

export const showErrorMsg = (errorMsg) => ({ type: SHOW_ERROR_MSG, errorMsg })

export const logout = () =>{
    storageUtils.removeUser()
    return {type: RESET_USER}
}

export const loginAction = (username, password) => {
    return async dispatch => {
        const result = await reqLogin(username, password)
        if (result.status === 0) {
            const user = result.data
            storageUtils.saveUser(user)
            dispatch(receiveUser(user))
        } else {
            const msg = result.msg
            dispatch(showErrorMsg(msg))
        }
    }
}