import React from 'react'
import { useState } from 'react'
import axios from 'axios'



const Registration = function (props) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    registrationErrors: ""
  })

  const handleSubmit = function (event) {

    axios.post("http://localhost:3001/registrations", {

      roaster: {
        email: form.email || undefined,
        password: form.password || undefined,
        password_confirmation: form.password_confirmation || undefined
      }
    },
      { withCredentials: true })
      .then(response => {
        if (response.data.status === "created") {
          props.handleSuccessfulAuth(response.data)
        }
      })
      .catch(error => { console.log('registration error', error) })
    event.preventDefault()
  }

  const handleChange = name => event => {
    setForm({ ...form, [name]: event.target.value })
  }

  return (
    <div>
      <form onSubmit={handleSubmit} >
        <input type="email" name="email" placeholder="email" value={form.email} onChange={handleChange('email')} required></input>

        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange('password')} required></input>

        <input type="password" name="password_confirmation" placeholder="Password_confirmation" value={form.password_confirmation} onChange={handleChange('password_confirmation')} required></input>

        <button type="submit">Register</button>
      </form>
    </div>)
}

export default Registration