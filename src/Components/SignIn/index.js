import React, { Component } from "react";
import "./styles.scss";
import Button from "./../Forms/Button";
import FormInputs from "./../Forms/FormInputs";
import {  handleUserProfile } from "./../../Firebase/utils";

import { signInWithGoogle, auth} from "./../../Firebase/utils";

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
    const {
        email,
        password,
      
      } = this.state;
  
    //   if (password !== confirmPassword) {
    //     const err = ["Password does not match"];
    //     this.setState({ errors: err });
    //     return;
    // }
       try{
        // destructure user object from response
       const {user} =  await auth.signInWithEmailAndPassword(email,password)
       console.log("userr==>", user)
  
    //    await handleUserProfile(user);
  
       this.setState({...initialState})
  
       }catch(err){
        console.error(err)
        const err1 = [err.message];
        this.setState({errors: [err.message]})
  
       }
  
  };
  render() {
    const { email, password, errors} = this.state;
    return (
      <div class="signin">
        <div class="wrap">
          <h2> Login</h2>

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
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
