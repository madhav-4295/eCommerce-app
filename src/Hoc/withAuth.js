
import {useAuth} from "./../CustomHooks"
import {withRouter} from "react-router-dom"

//creating a HOC 
const WithAuth = props =>  useAuth(props) && props.children;


export default withRouter(WithAuth);