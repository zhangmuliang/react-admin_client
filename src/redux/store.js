//核心管理对象store
import {applyMiddleware, createStore, compose} from 'redux'
import thunk from 'redux-thunk'

import reducer from './reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(reducer, composeEnhancers(applyMiddleware(thunk)))