import userType from "./userType";

//SAGA

export const emailSignInStart = userCredentials => ({
  type: userType.EMAIL_SIGN_IN_START,
  payload: userCredentials
})
export const signInSuccess = user => ({
  type: userType.SIGN_IN_SUCCESS,
  payload: user
})

export const checkUserSession = () => ({
  type: userType.CHECK_USER_SESSION

})
export const signOutUserStart = ()=>({
  type: userType.SIGN_OUT_USER_START
})
export const signOutUserSuccess= ()=>({
  type: userType.SIGN_OUT_USER_SUCCESS
})

export const signUpUserStart= (userCredentials)=>({
  type: userType.SIGN_UP_USER_START,
  payload:userCredentials
})

export const userError = err => ({
  type: userType.USER_ERROR,
  payload:err
})

export const resetPasswordStart = usercredentials =>({
  type: userType.RESET_PASSWORD_START,
  payload: usercredentials
})
export const resetPasswordSuccess = () =>({
  type: userType.RESET_PASSWORD_SUCCESS,
  payload:true
})

export const resetUserState = () =>({
  type: userType.RESET_USER_STATE
})
export const setCurrentUser = (user) => ({
  type: userType.SET_CURRENT_USER,
  payload: user,
});

export const googleSignInStart = () => ({
  type: userType.GOOGLE_SIGN_IN_START
})
