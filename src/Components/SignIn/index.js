import React,{Component} from "react"
import "./styles.scss"
import Button from "./../Forms/Button"
import {signInWithGoogle} from "./../../Firebase/utils"


class SignIn extends Component{

    handleSubmit = async e =>{
        e.preventDefault()
    }
    render(){
        return (
            <div class= "signin">
                <div class= "wrap">
                    <h2> Login</h2>
    
                    <div className="formwrap">
                        <form onSubmit={this.handleSubmit}>
                            <div className="socialSignIn">
                                <div className="row">
                                <Button onClick={signInWithGoogle}> Sign With Google</Button>
    
                                </div>
                            </div>
                        </form>
    
                    </div>
                </div>
            </div>
        )

    }

}

export default SignIn