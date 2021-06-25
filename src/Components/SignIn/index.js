import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";

import "./styles.scss";
import Button from "./../Forms/Button";
import FormInputs from "./../Forms/FormInputs";
import AuthWrapper from "./../AuthWrapper";
import { Link , useHistory} from "react-router-dom";
import {emailSignInStart, googleSignInStart} from "./../../Redux/User/userActions"

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userError: user.userError
})
const SignIn = (props) => {
  const dispatch  = useDispatch()
  const history = useHistory()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const {currentUser, userError} = useSelector(mapState)

  useEffect(() => {
    if(currentUser){
      resetForm()

      history.push("/")
    }
  },[currentUser])
  useEffect(() => {
    if(Array.isArray(userError) && userError.length > 0){
      setErrors(userError)
    }
  },[userError])

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setErrors([])

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(emailSignInStart({email, password}))
  };


const handleGoogleSignIn = () =>{
  dispatch(googleSignInStart())
}
  const configAuthWrap = {
    headline: "Login",
  };
  return (
    <AuthWrapper {...configAuthWrap}>
      <div className="formwrap">
        <form onSubmit={handleSubmit}>
          <FormInputs
            type="email"
            name="email"
            value={email}
            placeholder="Email "
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormInputs
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* error display */}
          {errors.length > 0 && (
            <ul>
              {errors.map((err) => {
                return <li>{err}</li>;
              })}
            </ul>
          )}

          <Button type="submit">Login</Button>

          <div className="socialSignIn">
            <div className="row">
              <Button onClick={handleGoogleSignIn}> Sign With Google</Button>
            </div>
          </div>
          <div className="forgotPasswordLink">
            <Link to="/Recovery">Forgot Password</Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default SignIn;
