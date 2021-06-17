import React, { Component } from "react";
// import Header from "./Components/Header";
import MainLayout from "./../src/Layouts/mainLayout";
import HomePage from "./Pages/HomePage";
import Registeration from "./Pages/Registeration";
import Login from "./Pages/LoginPage";
import { Route, Switch, Redirect } from "react-router-dom";
import { auth, handleUserProfile } from "./Firebase/utils";
import "./default.scss";

//initial user state
const intialState = {
  currentUser: null,
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...intialState,
    };
  }

  //eventListener
  authListener = null;
  componentDidMount() {
    this.authListener = auth.onAuthStateChanged( async userAuth=> {
      //when user is not logged in
      if(userAuth){
       const userRef = await handleUserProfile(userAuth);
        
        userRef.onSnapshot(snapshot=>{
          this.setState({currentUser: {
            id: snapshot.id,
            ...snapshot.data()
          }})
        })
      }
      this.setState({
        ...intialState
      })
    });
  }

  //ensure no memory leaks from app
  componentWillUnmount() {
    this.authListener();
  }

  render() {
    //destrcuture current user form state
    const { currentUser } = this.state;
    return (
      <div className="App">
        {/* <Header /> */}
        {/* centering the content with class */}
        {/* <div className="main"> */}
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <MainLayout currentUser={currentUser}>
                <HomePage />
              </MainLayout>
            )}
          />
          <Route
            path="/Registeration"
            render={() => (
              <MainLayout currentUser={currentUser}>
                <Registeration />
              </MainLayout>
            )}
          />
          <Route
            path="/Login"
            render={() =>
              currentUser ? (
                <Redirect to="/" />
              ) : (
                <MainLayout currentUser={currentUser}>
                  <Login />
                </MainLayout>
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

export default App;
