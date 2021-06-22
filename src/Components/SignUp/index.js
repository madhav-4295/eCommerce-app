import React, { useState } from "react";
import {withRouter} from "react-router-dom"
import "./styles.scss";
import FormInputs from "./../Forms/FormInputs";
import Button from "./../Forms/Button";
import AuthWrapper from "./../AuthWrapper";
import { auth, handleUserProfile } from "./../../Firebase/utils";

const SignUp = (props) => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const resetForm = () => {
    setDisplayName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors([])
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      const err = ["Password does not match"];
      setErrors(err);
      return;
    }
    try {
      // destructure user object from response
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log("userr==>", user);

      await handleUserProfile(user, { displayName });

      props.history.push('/')

      resetForm();
    } catch (err) {
      const err1 = [err.message];
      setErrors(err1);
    }
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
