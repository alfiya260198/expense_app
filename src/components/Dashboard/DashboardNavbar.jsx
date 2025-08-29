import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const DashboardNavbar = () => {
  const handleLogout = async () => {
    await signOut(auth);
    setIsLoggedIn(false);
  };
  return (
    <div className="dashboard-navbar">
      <div className="left-nav">
        <p className="dashboard-welcome">Welcome to Expense Tracker!!!</p>
      </div>
      <div className="right-nav">
        <p className="dashboard-incomplete">
          Your Profile is Incomplete.{" "}
          <Link to="/complete-profile">Complete Now</Link>
        </p>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardNavbar;
