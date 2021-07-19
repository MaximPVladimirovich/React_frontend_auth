import React, { useState } from 'react'
import Registration from './auth/Registration'
import Login from './auth/Login'
import axios from 'axios'

const Home = function (props) {

  const handleSuccessfulAuth = function (data) {
    props.handleLogin(data)
    props.history.push("/dashboard")
  }

  function handleLogoutClick() {
    axios.delete("http://localhost:3001/logout", { withCredentials: true }).then(response => {
      props.handleLogout()
    }).catch(error => {
      console.log("logout error", error)
    })
  }

  return (
    <div>
      <h1>Home</h1>
      <h1>Status: {props.loggedInStatus}</h1>
      <button onClick={() => handleLogoutClick()}>Logout </button>
      <Registration handleSuccessfulAuth={handleSuccessfulAuth} />
      <Login handleSuccessfulAuth={handleSuccessfulAuth} />
    </div >
  )
}

export default Home