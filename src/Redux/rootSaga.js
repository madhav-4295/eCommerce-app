// import effects from saga lib
// all effect allows you to resolve effects in parallel. like promise.all
// call allows you to call the functions

import {all, call} from "redux-saga/effects"
import userSagas from "./User/userSagas"

//1st generator function
export default function* rootSaga() {
    yield all([call(userSagas)])
}