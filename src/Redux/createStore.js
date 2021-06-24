import {createStore, applyMiddleware} from  "redux"
import {logger} from "redux-logger"
import thunk from "redux-thunk"
import rootReducer from "./rootReducer"

export const middleware = [thunk,logger]


//create store 

export const store = createStore(rootReducer,applyMiddleware(...middleware))
export default store;