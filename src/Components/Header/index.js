import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import Logo from "../../Assets/logo.png";

import {auth} from "./../../Firebase/utils"

const Header = (props) => {
  //destructure user props passed
  const { currentUser } = props;
  return (
    <header className="header">
      <div className="wrapper">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="logo"></img>
          </Link>
        </div>
        <div className="callToAction">
          {/* conditional render based on userlogin status */}

          {currentUser && (
            <ul>
              <li>
                <span onClick={()=>auth.signOut()}>Logout</span> 
                {/* this wont directly update the state of our current user, hence in app.js restore 
                    the current user state to initila state i.e. null*/}
              </li>
            </ul>
          )}

          {!currentUser && (
            <ul>
              <li>
                <Link to="/Registeration">Register</Link>
              </li>
              <li>
                <Link to="/Login">Login</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};
Header.defaultProps = {
  currentUser: null,
};
export default Header;
