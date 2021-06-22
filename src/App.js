import React, { useEffect } from "react";
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
import Dashboard from "./Pages/Dashboard";

//HOC
import WithAuth from "./Hoc/withAuth";

//Redux

import { setCurrentUser } from "./Redux/User/userActions";

const App = (props) => {
  useEffect(() => {
    //eventListener

    const authListener = auth.onAuthStateChanged(async (userAuth) => {
      //when user is not logged in
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);

        userRef.onSnapshot((snapshot) => {
          props.setCurrentUser({ id: snapshot.id, ...snapshot.data() });
        });
      }
      props.setCurrentUser(userAuth);
    });
    return () => {
      authListener();
    };
  }, []);

  //ensure no memory leaks from app

  //destrcuture current user form state
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
            // props.currentUser ? (
            //   <Redirect to="/" />
            // ) : 
            (
              <MainLayout>
                <Registeration />
              </MainLayout>
            )
          }
        />
        <Route
          path="/Login"
          render={() =>
            // props.currentUser ? (
            //   <Redirect to="/" />
            // ) : 
            (
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
        <Route
          path="/Dashboard"
          render={() => (
            <WithAuth>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </WithAuth>
          )}
        />
      </Switch>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
