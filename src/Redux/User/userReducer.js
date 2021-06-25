import userType from "./userType";

const initialState = {
  currentUser: null,
  userError: [],
  resetPasswordSuccess: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userType.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        userError: [],
      };
    case userType.USER_ERROR:
      return {
        ...state,
        userError: action.payload,
      };
    case userType.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordSuccess: action.payload,
        userError: [],
      };
    case userType.RESET_USER_STATE:
    case userType.SIGN_OUT_USER_SUCCESS:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};

export default userReducer;
