import React from "react";
// import Header from "./Components/Header";
import MainLayout from "./../src/Layouts/mainLayout"
import HomePage from "./Pages/HomePage";
import Registeration from "./Pages/Registeration";
import {Route, Switch} from "react-router-dom"

import "./default.scss";
function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      {/* centering the content with class */}
      {/* <div className="main"> */}
        <Switch>
        <Route path ="/" exact render={()=>(
          <MainLayout>
            <HomePage />
          </MainLayout>
        )} />
        <Route path ="/Registeration" render={()=>(
          <MainLayout>
            <Registeration />
          </MainLayout>
        )} />

        </Switch>

        {/* <HomePage />
        <Registeration /> */}

      {/* </div> */}

    </div>
  );
}

export default App;
