import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";

import "./styles.scss";
import Button from "./../Forms/Button";
import FormInputs from "./../Forms/FormInputs";
// import {  handleUserProfile } from "./../../Firebase/utils";
import AuthWrapper from "./../AuthWrapper";
// import { signInWithGoogle } from "./../../Firebase/utils";
import { Link, withRouter , useHistory} from "react-router-dom";
import {signInUser, signInWithGoogle} from "./../../Redux/User/userActions"

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  signInSuccess: user.signInSuccess
})
const SignIn = (props) => {
  const dispatch  = useDispatch()
  const history = useHistory()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const {currentUser, signInSuccess} = useSelector(mapState)

  useEffect(() => {
    if(currentUser){
      resetForm()

      history.push("/")
    }
  },[currentUser])
  const resetForm = () => {
    setEmail("");
    setPassword("");
    setErrors([])

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInUser({email, password}))

  //   try {
  //     // destructure user object from response
  //     const { user } = await auth.signInWithEmailAndPassword(email, password);
  //     console.log("userr==>", user);
  //     props.history.push('/')

  //     resetForm();
  //   } catch (err) {
  //     console.error(err);
  //     const err1 = ["Password is invalid"];
  //     setErrors([err1]);
  //   }
  };


const handleGoogleSignIn = () =>{
  dispatch(signInWithGoogle())
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

export default withRouter(SignIn);
