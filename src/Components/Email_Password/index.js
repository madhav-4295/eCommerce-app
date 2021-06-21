import React, { Component } from "react";
// import "./styles.scss"
import AuthWrapper from "./../AuthWrapper";
import FormInputs from "./../Forms/FormInputs";
import Button from "./../Forms/Button";
import {auth} from "./../../Firebase/utils"
import {withRouter} from "react-router-dom"

const initialState = {
  email: "",
  errors:[]
};
class EmailPassword extends Component {
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

  handleSubmit = async (e) => {
      e.preventDefault();

      try{
        const {email} = this.state

        //redirect user to login page after reseting the password
        const config ={
            url: 'http://localhost:3000/Login'
        }
        await auth.sendPasswordResetEmail(email,config ).then(() => {

            console.log("password reset")
            this.props.history.push('/login')
        }).catch((err) => {
            console.log("something went wrong")
            const error=['Something went wrong. Please try again.']
            this.setState({errors:[error]})

        })

      } catch(err){
          console.log(err)
          // this.setState({errors:[err.message]})
      }

  };

  render() {
    const { email, errors} = this.state;
    const configAuthWrap = {
      headline: "Reset Password",
    };

    return (
      <AuthWrapper {...configAuthWrap}>
        <div className="formWrap">
          <form onSubmit={this.handleSubmit}>
            <FormInputs
              type="email"
              name="email"
              value={email}
              placeholder="Email "
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

            <Button type="submit">Reset Password</Button>
          </form>
        </div>
      </AuthWrapper>
    );
  }
}

export default withRouter(EmailPassword);
