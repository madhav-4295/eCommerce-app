import React, { Component } from "react";
import "./styles.scss";
import FormInputs from "./../Forms/FormInputs";
import Button from "./../Forms/Button";
import AuthWrapper from "./../AuthWrapper"
import { auth, handleUserProfile } from "./../../Firebase/utils";

const initialState = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
  errors: [],
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
    this.handlechange = this.handlechange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handlechange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const {
      displayName,
      email,
      password,
      confirmPassword,
    
    } = this.state;

    if (password !== confirmPassword) {
      const err = ["Password does not match"];
      this.setState({ errors: err });
      return;
    }
     try{
      // destructure user object from response
     const {user} =  await auth.createUserWithEmailAndPassword(email,password)
     console.log("userr==>", user)

     await handleUserProfile(user,{displayName});

     this.setState({...initialState})

     }catch(err){
      console.error(err)
      const err1 = [err.message];
      this.setState({errors: [err.message]})

     }
  };
  render() {
    const {
      displayName,
      email,
      password,
      confirmPassword,
      errors,
    } = this.state;
    const configAuthWrap = {
      headline: "Registeration"
    }
    return (
      <AuthWrapper {... configAuthWrap}>
                  <div className="formWrap">
            <form onSubmit={this.handleSubmit}>
              <FormInputs
                type="text"
                name="displayName"
                value={displayName}
                placeholder="Full Name"
                onChange={this.handlechange}
              />
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
              <FormInputs
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={this.handlechange}
              />

              {/* error display */}
              {errors.length > 0 && (
                <ul>
                  {errors.map((err,index) => {
                    return <li key={index}>{err}</li>;
                  })}
                </ul>
              )}

              <Button type="submit">Register</Button>
            </form>
          </div>

      </AuthWrapper>

      //   </div>
      // </div>
    );
  }
}

export default SignUp;
