import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar"

const Dashboard = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      navigate("/login"); 
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
    <DashboardNavbar />
      <div className="dashboard">
      <h1>Welcome to Dashboard 🎉</h1>
      <button onClick={handleLogout} className="logout">Logout</button>
    </div>
    </>
  );
};

export default Dashboard;
