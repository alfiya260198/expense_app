import React, { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import FormImage from "../../../src/assets/images/form-image.png";
import Logo from "../../../src/assets/images/newlogo.png";

const Login = ({ setShowLogin, setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);
      navigate("/dashboard");
    } catch (err) {
      switch (err.code) {
        case "auth/invalid-email":
          setError("Invalid email format ❌");
          break;
        case "auth/user-not-found":
          setError("No account found with this email ❌");
          break;
        case "auth/wrong-password":
          setError("Wrong password ❌");
          break;
        case "auth/too-many-requests":
          setError("Too many failed attempts. Try again later ⏳");
          break;
        default:
          setError("Login failed. Please check your email and password ❌");
      }
    }
  };

  return (
    <div className="signup">
      <div className="form-box">
        {/* Left Image Box */}
        <div className="form-left-box">
          <img src={FormImage} alt="Form Image" />
        </div>

        {/* Right Form Box */}
        <div className="form-right-box">
          <div className="signup-title">
            <img src={Logo} alt="Logo" />
            <span>Sharpener</span>
          </div>

          <form className="signup-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="signup-btn">
              Login
            </button>
            <button
              type="button"
              className="forgot-password"
              onClick={() => navigate("/forgot-password")}
            >
              <span>Forgot password?</span>
            </button>
          </form>

          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

          <div className="login-link">
            <p className="login-link-text">
              <span>Don’t have an account?</span>{" "}
              <Link
                to="/"
                className="link-btn"
                onClick={() => setShowLogin(false)}
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
