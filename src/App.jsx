import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Signup from './components/Signup/Signup'
import Login from './components/Signup/Login'

const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <>
      <Navbar />
      {isLoggedIn ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h1>Welcome to Expense Tracker 🎉</h1>
        </div>
      ) : showLogin ? (
        <Login setShowLogin={setShowLogin} setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <Signup setShowLogin={setShowLogin} />
      )}
    </>
  )
}

export default App
