import React from "react";
import "./styles.scss";
import Logo from "../../Assets/logo.png"

const Header =(props)=>{
    return(
        <header className="header">
            <div className="wrapper">
                <div className="logo">
                    <img src= {Logo} alt="logo" ></img>
                </div>
            </div>
            {/* <p>Header</p> */}
        </header>
    )
}

export default Header