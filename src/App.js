import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { auth, handleUserProfile } from "./Firebase/utils";
import { useSelector, useDispatch} from "react-redux";

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
  const dispatch = useDispatch()
  useEffect(() => {
    //eventListener

    const authListener = auth.onAuthStateChanged(async (userAuth) => {
      //when user is not logged in
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);

        userRef.onSnapshot((snapshot) => {
          dispatch(setCurrentUser({ id: snapshot.id, ...snapshot.data() }));
        });
      }
      dispatch(setCurrentUser(userAuth));
    });
    return () => {
        //ensure no memory leaks from app

      authListener();
    };
  }, []);


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


export default App;
