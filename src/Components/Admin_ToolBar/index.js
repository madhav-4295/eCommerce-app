import React from 'react';
import "./styles.scss";
import {Link} from "react-router-dom"
import {useSelector} from "react-redux"
import {checkIsAdmin} from "./../../Utils"

const mapState = ({ user }) => ({
    currentUser: user.currentUser
})
const  AdminToolBar= ()=>{

    const {currentUser} = useSelector(mapState)


    const isAdmin = checkIsAdmin(currentUser)
    console.log(isAdmin,"is admin ")
    if(!isAdmin) return null;

    return(
        <div className="admin-toolbar">
            <ul>
                <li>
                    <Link to="/Admin">My Admin</Link>
                </li>
            </ul>
        </div>
    )
}

export default AdminToolBar;