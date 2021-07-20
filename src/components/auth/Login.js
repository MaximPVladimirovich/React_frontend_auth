import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const Login = function (props) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    loginErrors: ""
  })

  const handleChange = name => event => {
    setForm({ ...form, [name]: event.target.value })
  }

  const handleSubmit = function (event) {
    axios.post("https://beanstalk-api.herokuapp.com/sessions", {
      roaster: {
        email: form.email || undefined,
        password: form.password || undefined
      }
    },
      { withCredentials: true })
      .then(response => {
        if (response.data.status === "created") {
          props.handleSuccessfulAuth(response.data)
        }
      })
      .catch(error => { console.log('login error', error) })
    event.preventDefault()
  }

  return (
    <div>
      <form onSubmit={handleSubmit} >
        <input type="email" name="email" placeholder="email" value={form.email} onChange={handleChange('email')} required></input>

        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange('password')} required></input>

        <button type="submit">Login</button>
      </form>
    </div>)
}

export default Login