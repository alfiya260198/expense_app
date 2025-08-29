import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import AuthNavbar from "./components/Navbar/Navbar";
import Signup from "./components/Signup/Signup";
import Login from "./components/Signup/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import CompleteProfile from "./components/CompleteProfile/CompleteProfile";
import ForgotPassword from "./components/Signup/ForgotPassword";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <Router>
      {!isLoggedIn && <AuthNavbar />}

      <Routes>
        <Route
          path="/"
          element={!isLoggedIn ? <Signup /> : <Navigate to="/dashboard" />}
        />

        <Route
          path="/login"
          element={
            !isLoggedIn ? (
              <Login setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <Dashboard setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/complete-profile"
          element={isLoggedIn ? <CompleteProfile /> : <Navigate to="/login" />}
        />

        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/dashboard" : "/"} />}
        />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>


    </Router>
  );
};

export default App;
