import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

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
import Admin from "./Pages/Admin";

//HOC
import WithAuth from "./Hoc/withAuth";
import WithAdminAuth from "./Hoc/withAdminAuth";
//Redux

import { checkUserSession } from "./Redux/User/userActions";

//Components
import AdminToolBar from "./Components/Admin_ToolBar"

const App = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    //eventListener

    dispatch(checkUserSession());
  }, []);

  return (
    <div className="App">
      {/* <Header /> */}
      {/* centering the content with class */}
      {/* <div className="main"> */}
      <AdminToolBar />
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
          render={() => (
            <MainLayout>
              <Registeration />
            </MainLayout>
          )}
        />
        <Route
          path="/Login"
          render={() => (
            <MainLayout>
              <Login />
            </MainLayout>
          )}
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
          path="/Admin"
          render={() => (
            <WithAdminAuth>
              <MainLayout>
                <Admin />
              </MainLayout>
            </WithAdminAuth>
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
