import {createStore, applyMiddleware} from  "redux"
import {logger} from "redux-logger"

import rootReducer from "./rootReducer"

export const middleware = [logger]

//create store 

export const store = createStore(rootReducer,applyMiddleware(...middleware))
export default store;