
import {useAdminAuth} from "./../CustomHooks"
const WithAdminAuth = props => useAdminAuth(props) && props.children

export default WithAdminAuth