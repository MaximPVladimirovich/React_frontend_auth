import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './Home'
import Dashboard from './Dashboard'
import { useState } from 'react'
import axios from 'axios';

const App = function () {

  const [roaster, setRoaster] = useState({
    loggedInStatus: "NOT_LOGGED_IN",
    roaster: {}
  })

  const checkLoginStatus = function () {
    axios
      .get("http://localhost:3001/logged_in", { withCredentials: true })
      .then(response => {
        if (response.data.logged_in && roaster.loggedInStatus === "NOT_LOGGED_IN") {
          setRoaster({
            loggedInStatus: "LOGGED_IN",
            roaster: response.data.roaster
          })
        } else if (!response.data.logged_in && roaster.loggedInStatus === "LOGGED_IN ") {
          setRoaster({
            loggedInStatus: "NOT_LOGGED_IN",
            roaster: {}
          })
        }
      })
      .catch(error => {
        console.log("check login error", error)
      })
  };

  checkLoginStatus()

  const handleLogin = function (data) {
    setRoaster({
      loggedInStatus: 'LOGGED_IN',
      roaster: data
    })
  }

  const handleLogout = function () {
    setRoaster({
      loggedInStatus: "NOT_LOGGED_IN",
      roaster: {}
    })
  }

  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path={"/"}
            render={props => (
              <Home {...props} handleLogin={handleLogin} loggedInStatus={roaster.loggedInStatus} handleLogout={handleLogout} />
            )} />
          <Route
            exact
            path={"/dashboard"}
            render={props => (
              <Dashboard {...props} loggedInStatus={roaster.loggedInStatus} />
            )} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
export default App