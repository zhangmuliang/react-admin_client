//包含n个action creator函数的模块
//同步：对象{type:'',data:数据值}
//异步：函数 dispatch={}
import { SET_HEAD_TITLE } from "./action-types"

export const setHeadTitle =(headTitle)=> ({type:SET_HEAD_TITLE,data:headTitle})