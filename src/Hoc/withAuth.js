
import {useAuth} from "./../CustomHooks"

//creating a HOC 
const WithAuth = props =>  useAuth(props) && props.children;


export default WithAuth;