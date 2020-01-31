import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";

import Login from "./components/Login";
import BubblePage from "./components/BubblePage";
import PrivateRoute from "./components/PrivateRoute";

import "./styles.scss";

function App() {
  return (
      <div className="App">
        <Switch>
          <PrivateRoute path='/bubbles' component={BubblePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Login} />
        </Switch>
      </div>
  );
}

export default App;
