import React from 'react'
import { Link } from 'react-router-dom'

const CompleteProfileNav = () => {
  return (
     <div className='dashboard-navbar'>
      <p className='dashboard-welcome'>Winners never quite, Quitters never win</p>
      <p className='dashboard-incomplete'>
        Your Profile 64% complete. A complete profile has higher chances of landing a job. <Link to="/complete-profile">Complete Now</Link>
      </p>
    </div>
  )
}

export default CompleteProfileNav
