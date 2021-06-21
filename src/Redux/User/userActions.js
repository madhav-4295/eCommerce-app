import React from "react"

import userType from "./userType"

export const setCurrentUser = user =>({
    type: userType.SET_CURRENT_USER,
    payload: user
})