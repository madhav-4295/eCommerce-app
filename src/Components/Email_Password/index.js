import React, { useState,useEffect } from "react";
// import "./styles.scss"
import AuthWrapper from "./../AuthWrapper";
import FormInputs from "./../Forms/FormInputs";
import Button from "./../Forms/Button";
// import { auth } from "./../../Firebase/utils";
import { withRouter, useHistory } from "react-router-dom";
import {forgetPassword, resetAuthForm} from "./../../Redux/User/userActions"
import {useDispatch, useSelector} from "react-redux";


const mapState = ({user}) =>({
  resetPasswordSuccess: user.resetPasswordSuccess,
  resetPasswordError: user.resetPasswordError
})

const EmailPassword = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  const {resetPasswordError, resetPasswordSuccess} = useSelector(mapState)

  useEffect(()=>{
    if(resetPasswordSuccess){
      dispatch(resetAuthForm())
      resetForm()
      history.push("/Login")
    }
  },[resetPasswordSuccess])

  const resetForm = () => {
    setEmail("");
    setErrors([])
  };


  useEffect(()=>{
    if(Array.isArray(resetPasswordError) && resetPasswordError.length>0 ){
      setErrors(resetPasswordError)
    }
  },[resetPasswordError])


  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(forgetPassword({email}))

    console.log(errors, resetPasswordError)

    // try {
    //   //redirect user to login page after reseting the password
    //   const config = {
    //     url: "http://localhost:3000/Login",
    //   };
    //   await auth
    //     .sendPasswordResetEmail(email, config)
    //     .then(() => {
    //       props.history.push("/login");
    //     })
    //     .catch((err) => {
    //       const error = ["Something went wrong. Please try again."];
    //       setErrors([error]);
    //     });
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const configAuthWrap = {
    headline: "Reset Password",
  };

  return (
    <AuthWrapper {...configAuthWrap}>
      <div className="formWrap">
        <form onSubmit={handleSubmit}>
          <FormInputs
            type="email"
            name="email"
            value={email}
            placeholder="Email "
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* error display */}
          {errors.length > 0 && (
            <ul>
              {errors.map((err, index) => {
                return <li key={index}>{err}</li>;
              })}
            </ul>
          )}

          <Button type="submit">Reset Password</Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(EmailPassword);
