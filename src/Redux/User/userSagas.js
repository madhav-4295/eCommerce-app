import { takeLatest, all, call, put } from "redux-saga/effects";
import {
  auth,
  handleUserProfile,
  getCurrentUser,
  googleProvider,
} from "./../../Firebase/utils";

import userType from "./userType";
import { signInSuccess, signOutUserSuccess, userError, resetPasswordSuccess } from "./userActions";
import {handleResetPasswordAPI} from "./userHelper"

//helper generator function

export function* getSnapShotFromUserAuth(user, additionalData = {}) {
  try {
    const userRef = yield call(handleUserProfile, {
      userAuth: user,
      additionalData,
    });
    const snapshot = yield userRef.get();
    yield put(signInSuccess({ id: snapshot.id, ...snapshot.data() }));
  } catch (err) {
    console.log(err);
  }
}

export function* emailSignIn({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapShotFromUserAuth(user);
  } catch (err) {
    console.error(err);
    yield put(userError([err.message]));

    //   const err1 = ["Password is invalid"];
    //   setErrors([err1]);
  }
}
export function* onEmailSignInStart() {
  // two params, 1- action 2- generator function that handle this event
  yield takeLatest(userType.EMAIL_SIGN_IN_START, emailSignIn);
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapShotFromUserAuth(userAuth);
  } catch (err) {
    console.log(err);
  }
}
export function* onCheckUserSession() {
  yield takeLatest(userType.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signOutUser() {
  try {
    yield auth.signOut();
    yield put(signOutUserSuccess());
  } catch (err) {
    // console.log(err)
  }
}
export function* onSignOutUserStart() {
  yield takeLatest(userType.SIGN_OUT_USER_START, signOutUser);
}

export function* signUpUser({
  payload: { displayName, email, password, confirmPassword },
}) {
  if (password !== confirmPassword) {
    const err = ["Password does not match"];
    yield put(userError(err));
    return;
  }
  try {
    // destructure user object from response
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    const additionalData = { displayName };
    yield getSnapShotFromUserAuth(user, additionalData);

  } catch (err) {
        yield put(userError([err.message]));

    //   const err1 = [err.message];
    //   setErrors(err1);
  }
}

export function* resetPassword({payload:{email}}){


    try{    

        yield call(handleResetPasswordAPI,email);
        yield put(resetPasswordSuccess());

    }catch(err){
        yield put( userError(err))
    }
}
export function* onResetPasswordStart() {
    yield takeLatest(userType.RESET_PASSWORD_START, resetPassword)
}
export function* onSignUpUserStart() {
  yield takeLatest(userType.SIGN_UP_USER_START, signUpUser);
}

export function* googleSignIn(){
    try{
        const {user} = yield auth.signInWithPopup(googleProvider)
        yield getSnapShotFromUserAuth(user);

       } catch (err){
  
      }
  
}
export function* onGoogleSignInStart() {
    yield takeLatest(userType.GOOGLE_SIGN_IN_START, googleSignIn)
}


export default function* userSagas() {
  yield all([
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutUserStart),
    call(onSignUpUserStart),
    call(onResetPasswordStart),
    call(onGoogleSignInStart)
  ]);
}
