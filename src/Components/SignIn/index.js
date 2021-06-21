import React, { Component } from "react";
import "./styles.scss";
import Button from "./../Forms/Button";
import FormInputs from "./../Forms/FormInputs";
// import {  handleUserProfile } from "./../../Firebase/utils";
import AuthWrapper from "./../AuthWrapper";
import { signInWithGoogle, auth } from "./../../Firebase/utils";

import {Link} from "react-router-dom"

const initialState = {
  email: "",
  password: "",
  errors: [],
};

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
    this.handlechange = this.handlechange.bind(this);
  }

  handlechange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      // destructure user object from response
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      console.log("userr==>", user);

      this.setState({ ...initialState });
    } catch (err) {
      console.error(err);
      const err1 = [err.message];
      this.setState({ errors: [err.message] });
    }
  };
  render() {
    const { email, password, errors } = this.state;

    const configAuthWrap = {
        headline: "Login"
    }
    return (
          <AuthWrapper {...configAuthWrap}>
            <div className="formwrap">
            <form onSubmit={this.handleSubmit}>
              <FormInputs
                type="email"
                name="email"
                value={email}
                placeholder="Email "
                onChange={this.handlechange}
              />
              <FormInputs
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={this.handlechange}
              />
              {/* error display */}
              {errors.length > 0 && (
                <ul>
                  {errors.map((err) => {
                    return <li>{err}</li>;
                  })}
                </ul>
              )}

              <Button type="submit"> Login</Button>

              <div className="socialSignIn">
                <div className="row">
                  <Button onClick={signInWithGoogle}> Sign With Google</Button>
                </div>
              </div>
              <div className="forgotPasswordLink">
                <Link to="/Recovery">Forgot Password</Link>
              </div>
            </form>
          </div>

          </AuthWrapper>
    );
  }
}

export default SignIn;
