import React, { useState } from 'react'
import './Signup.css'
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword } from "firebase/auth"

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      setSuccess("Account created successfully 🎉")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className='signup'>
      <div className='form-box'>
        <p className='signup-title'>SignUp</p>
        <form className='signup-form' onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
          <input 
            type="password" 
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
          <input 
            type="password" 
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required
          />
          <button type="submit" className='signup-btn'>SignUp</button>
        </form>

        {error && <p style={{color: "red", marginTop: "10px"}}>{error}</p>}
        {success && <p style={{color: "green", marginTop: "10px"}}>{success}</p>}
      </div>
      <div className='login-link'>
        <p className='login-link-text'>Have an account? <a href="#">Login</a></p>
      </div>
    </div>
  )
}

export default Signup
