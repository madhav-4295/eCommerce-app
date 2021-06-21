import userType from "./userType"

const initialState={
    currentUser:null
};

const userReducer = (state, action)=>{

    switch (action.type) {

        case userType.SET_CURRENT_USER:
            return{
                ...initialState,
                currentUser: action.payload
            }
        default:
            return initialState
    }
}

export default userReducer