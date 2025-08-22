import React, { useState } from 'react'
import { auth } from '../../firebase'
import { signInWithEmailAndPassword } from "firebase/auth"

const Login = ({ setShowLogin, setIsLoggedIn }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      await signInWithEmailAndPassword(auth, email, password)
      setIsLoggedIn(true) // ✅ switch to welcome screen
    } catch (err) {
      switch (err.code) {
        case "auth/invalid-email":
          setError("Invalid email format ❌")
          break
        case "auth/user-not-found":
          setError("No account found with this email ❌")
          break
        case "auth/wrong-password":
          setError("Wrong password ❌")
          break
        case "auth/too-many-requests":
          setError("Too many failed attempts. Try again later ⏳")
          break
        default:
          setError("Login failed. Please check your email and password ❌")
      }
    }
  }

  return (
    <div className='signup'>
      <div className='form-box'>
        <p className='signup-title'>Login</p>
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
          <button type="submit" className='signup-btn'>Login</button>
          <a href="#" className='forgot-password'>Forgot Password</a>
        </form>

        {error && <p style={{color: "red", marginTop: "10px"}}>{error}</p>}
      </div>
      <div className='login-link'>
        <p className='login-link-text'>
          Don't have an account?{" "}
          <button 
            className="link-btn" 
            onClick={() => setShowLogin(false)}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  )
}

export default Login
