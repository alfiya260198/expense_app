import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const DashboardNavbar = () => {
  return (
    <div className='dashboard-navbar'>
      <p className='dashboard-welcome'>Welcome to Expense Tracker!!!</p>
      <p className='dashboard-incomplete'>
        Your Profile is Incomplete. <Link to="/complete-profile">Complete Now</Link>
      </p>
    </div>
  );
};

export default DashboardNavbar;
