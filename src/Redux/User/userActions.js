import userType from "./userType";
import { auth, handleUserProfile, googleProvider } from "./../../Firebase/utils";
// import { useDispatch, useSelector } from "react-redux";

export const setCurrentUser = (user) => ({
  type: userType.SET_CURRENT_USER,
  payload: user,
});

// export const setSignUpError = (err) => ({
//   type: userType.SIGN_UP_ERROR,
//   payload: err,
// });

export const signInUser = ({ email, password }) => async (dispatch) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    dispatch({
      type: userType.SIGN_IN_SUCCESS,
      payload: true,
    });
  } catch (err) {
    console.error(err);
    //   const err1 = ["Password is invalid"];
    //   setErrors([err1]);
  }
};

export const signUpUser = ({
  displayName,
  email,
  password,
  confirmPassword,
}) => async (dispatch) => {
  if (password !== confirmPassword) {
    const err = ["Password does not match"];
    // useDispatch(setSignUpError(err));
    dispatch({
        type: userType.SIGN_UP_ERROR,
        payload: err,
    });
    return;
  }
  try {
    // destructure user object from response
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    await handleUserProfile(user, { displayName });
    dispatch({
      type: userType.SIGN_UP_SUCCESS,
      payload: true,
    });
  } catch (err) {
    //   const err1 = [err.message];
    //   setErrors(err1);
  }
};

export const forgetPassword = ({email}) => async (dispatch) =>{
    const config = {
        url: "http://localhost:3000/Login",
      };

    try {
        //redirect user to login page after reseting the password
        await auth
          .sendPasswordResetEmail(email, config)
          .then(() => {
              dispatch({
                  type: userType.RESET_PASSWORD_SUCCESS,
                  payload: true
              })
          })
          .catch(() => {
            const error = ["Email Id is not registered."];
            dispatch({
                type: userType.RESET_PASSWORD_ERROR,
                payload: error
            })

          });
      } catch (err) {
        console.log(err);
      }
  
}

export const signInWithGoogle = () => async dispatch => {

    try{
      await auth.signInWithPopup(googleProvider).then(() => {
        dispatch({
            type: userType.SIGN_IN_SUCCESS,
            payload: true,
          });
      
      })


    } catch (err){

    }
    };

export const resetAuthForm = () =>({
        type: userType.RESET_AUTH_FORM,
})