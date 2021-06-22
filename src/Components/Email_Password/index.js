import React, { useState } from "react";
// import "./styles.scss"
import AuthWrapper from "./../AuthWrapper";
import FormInputs from "./../Forms/FormInputs";
import Button from "./../Forms/Button";
import { auth } from "./../../Firebase/utils";
import { withRouter } from "react-router-dom";

const EmailPassword = (props) => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //redirect user to login page after reseting the password
      const config = {
        url: "http://localhost:3000/Login",
      };
      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          props.history.push("/login");
        })
        .catch((err) => {
          const error = ["Something went wrong. Please try again."];
          setErrors([error]);
        });
    } catch (err) {
      console.log(err);
    }
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
