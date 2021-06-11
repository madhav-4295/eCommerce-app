import React from "react";
import "./styles.scss";
import {Link} from "react-router-dom"
import Logo from "../../Assets/logo.png"

const Header =(props)=>{
    return(
        <header className="header">
            <div className="wrapper">
                <div className="logo">
                    <Link to="/">
                         <img src= {Logo} alt="logo" ></img>
                    </Link>
                </div>
                <div className="callToAction">
                    <ul>
                        <li>
                        <Link to="/Registeration">Register</Link>

                        </li>
                    </ul>
                </div>
            </div>
            {/* <p>Header</p> */}
        </header>
    )
}

export default Header