import React, { useState, useEffect} from "react";
import {withRouter, useHistory} from "react-router-dom"
import "./styles.scss";
import FormInputs from "./../Forms/FormInputs";
import Button from "./../Forms/Button";
import AuthWrapper from "./../AuthWrapper";
// import { auth, handleUserProfile } from "./../../Firebase/utils";
import {signUpUser} from "./../../Redux/User/userActions"
import {useDispatch, useSelector} from "react-redux";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  signUpSuccess: user.signUpSuccess,
  signUpError: user.signUpError
})




const SignUp = (props) => {
  const dispatch  = useDispatch()
  const history = useHistory()
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const {currentUser, signUpSuccess, signUpError} = useSelector(mapState)

  useEffect(() => {
    if(currentUser){
      resetForm()

      history.push("/")
    }
  },[currentUser])


  useEffect(() => {
    if(Array.isArray(signUpError) && signUpError.length > 0){
      setErrors(signUpError)
    }
  },[signUpError])

  const resetForm = () => {
    setDisplayName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors([])
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(signUpUser({displayName, email, password, confirmPassword}))

  //   if (password !== confirmPassword) {
  //     const err = ["Password does not match"];
  //     setErrors(err);
  //     return;
  //   }
  //   try {
  //     // destructure user object from response
  //     const { user } = await auth.createUserWithEmailAndPassword(
  //       email,
  //       password
  //     );
  //     console.log("userr==>", user);

  //     await handleUserProfile(user, { displayName });

  //     props.history.push('/')

  //     resetForm();
  //   } catch (err) {
  //     const err1 = [err.message];
  //     setErrors(err1);
  //   }
  };
  const configAuthWrap = {
    headline: "Registeration",
  };
  return (
    <AuthWrapper {...configAuthWrap}>
      <div className="formWrap">
        <form onSubmit={handleSubmit}>
          <FormInputs
            type="text"
            name="displayName"
            value={displayName}
            placeholder="Full Name"
            onChange={(e) => setDisplayName(e.target.value)}
          />
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
          <FormInputs
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* error display */}
          {errors.length > 0 && (
            <ul>
              {errors.map((err, index) => {
                return <li key={index}>{err}</li>;
              })}
            </ul>
          )}

          <Button type="submit">Register</Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(SignUp);
