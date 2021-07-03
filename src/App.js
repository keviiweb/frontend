import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Home from "./home/pages/Home";
import Finance from "./finance/pages/Finance";
import Vbs from "./vbs/pages/Vbs";
import Cca from "./cca/pages/Cca";
import Login from "./login/pages/Login";
import Signup from "./signup/pages/Signup";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { LoginContext } from "./shared/context/LoginContext";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    //routes when logged in
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/vbs" exact>
          <Vbs />
        </Route>
        <Route path="/finance" exact>
          <Finance />
        </Route>
        <Route path="/cca" exact>
          <Cca />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    //routes when not logged in
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/vbs" exact>
          <Vbs />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Redirect to="/" /> 
      </Switch>
    );
  }

  return (
    <LoginContext.Provider
      value={{isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        {/* <MainNavigation /> */}
        <main>
          {routes}
        </main>
      </Router>
    </LoginContext.Provider>
  );
};

export default App;
