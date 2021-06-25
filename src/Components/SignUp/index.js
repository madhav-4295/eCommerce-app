import React, { useState, useEffect} from "react";
import {useHistory} from "react-router-dom"
import "./styles.scss";
import FormInputs from "./../Forms/FormInputs";
import Button from "./../Forms/Button";
import AuthWrapper from "./../AuthWrapper";
import {signUpUserStart} from "./../../Redux/User/userActions"
import {useDispatch, useSelector} from "react-redux";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userError: user.userError
})




const SignUp = (props) => {
  const dispatch  = useDispatch()
  const history = useHistory()
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    setDisplayName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors([])
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userError)
    dispatch(signUpUserStart({displayName, email, password, confirmPassword}))

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

export default SignUp;
