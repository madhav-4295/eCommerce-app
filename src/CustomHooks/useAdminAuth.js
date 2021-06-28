import {useEffect} from "react"

import {useSelector} from "react-redux";
 import {useHistory} from "react-router-dom";
import {checkIsAdmin} from "./../Utils/"

const mapState = ({user}) =>({
    currentUser: user.currentUser
})

const useAdminAuth = props => {
    const {currentUser} = useSelector(mapState)
    const history = useHistory()

    useEffect(()=>{
        const check = checkIsAdmin(currentUser)
        console.log(check)
        if(!checkIsAdmin(currentUser)){
            // console.log(!checkIsAdmin)
            history.push("/Login")
        }

    },[currentUser])

    return currentUser;

}

export default useAdminAuth