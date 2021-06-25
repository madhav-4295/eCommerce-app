import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import {  useDispatch} from "react-redux";

//styles
import "./default.scss";
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

import { checkUserSession } from "./Redux/User/userActions";

const App = (props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    //eventListener

    dispatch(checkUserSession())

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
