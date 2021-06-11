import React from "react";
import Header from "./Components/Header";
import HomePage from "./Pages/HomePage";
import "./default.scss";
function App() {
  return (
    <div className="App">
      <Header />

      {/* centering the content with classname main */}
      <div className="main">
        <HomePage />
      </div>
    </div>
  );
}

export default App;
