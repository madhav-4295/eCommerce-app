import {createStore, applyMiddleware} from  "redux"
import {logger} from "redux-logger"
import thunk from "redux-thunk"

import createSagaMiddle from "redux-saga"

import rootSaga from "./rootSaga";
import rootReducer from "./rootReducer"

//instance of createSagaMiddle
const sagaMiddleware = createSagaMiddle();
export const middleware = [thunk, sagaMiddleware, logger]


//create store 

export const store = createStore(rootReducer,applyMiddleware(...middleware));

sagaMiddleware.run(rootSaga)

export default store;