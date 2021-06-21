import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { auth, handleUserProfile } from "./Firebase/utils";
import { connect } from "react-redux";

//styles
import "./default.scss";

// import Header from "./Components/Header";

//layout
import MainLayout from "./../src/Layouts/mainLayout";

//Pages
import HomePage from "./Pages/HomePage";
import Registeration from "./Pages/Registeration";
import Recovery from "./Pages/Recovery";
import Login from "./Pages/LoginPage";

//Redux

import { setCurrentUser } from "./Redux/User/userActions";

class App extends Component {
  //eventListener
  authListener = null;
  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async (userAuth) => {
      //when user is not logged in
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);

        userRef.onSnapshot((snapshot) => {
          this.props.setCurrentUser({ id: snapshot.id, ...snapshot.data() });
        });
      }
      this.props.setCurrentUser(userAuth);
    });
  }

  //ensure no memory leaks from app
  componentWillUnmount() {
    this.authListener();
  }

  render() {
    //destrcuture current user form state
    const { currentUser } = this.props;
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
              <MainLayout>
                <HomePage />
              </MainLayout>
            )}
          />
          <Route
            path="/Registeration"
            render={() =>
              currentUser ? (
                <Redirect to="/" />
              ) : (
                <MainLayout>
                  <Registeration />
                </MainLayout>
              )
            }
          />
          <Route
            path="/Login"
            render={() =>
              currentUser ? (
                <Redirect to="/" />
              ) : (
                <MainLayout>
                  <Login />
                </MainLayout>
              )
            }
          />
          <Route
            path="/Recovery"
            render={() => (
              <MainLayout>
                <Recovery />
              </MainLayout>
            )}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
