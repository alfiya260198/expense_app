import React, { useState } from 'react'
import './Nav.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='navbar'>
      <a href="#" className='logo'>MyWebLink</a>

      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <span className={isOpen ? "bar open" : "bar"}></span>
        <span className={isOpen ? "bar open" : "bar"}></span>
        <span className={isOpen ? "bar open" : "bar"}></span>
      </div>

      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <a href="#" className='navbar-content'>Home</a>
        <a href="#" className='navbar-content'>Products</a>
        <a href="#" className='navbar-content'>About Us</a>
      </div>
    </div>
  )
}

export default Navbar
