import React, { useState } from "react";
import "./Signup.css";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import FormImage from "../../../src/assets/images/form-image.png";
import Logo from "../../../src/assets/images/newlogo.png";

const Signup = ({ setShowLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match ❌");
      return;
    }

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess("Account created successfully 🎉 Redirecting to login...");

      // Reset form
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Redirect to login after 2 sec
      setTimeout(() => {
        setShowLogin(true);
      }, 2000);
    } catch (err) {
      let msg = "Something went wrong!";
      if (err.code === "auth/email-already-in-use") {
        msg = "This email is already registered.";
      } else if (err.code === "auth/weak-password") {
        msg = "Password should be at least 6 characters.";
      } else if (err.code === "auth/invalid-email") {
        msg = "Invalid email address.";
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup">
      <div className="form-box">
        <div className="form-left-box">
          <img src={FormImage} alt="Form Image" />
        </div>
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
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit" className="signup-btn" disabled={loading}>
              {loading ? "Creating..." : "Sign Up"}
            </button>
          </form>

          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
          {success && (
            <p style={{ color: "green", marginTop: "10px" }}>{success}</p>
          )}
          <div className="login-link">
            <p className="login-link-text">
              <span>Have an account?</span>{" "}
              <Link
                to="/login"
                className="link-btn"
                onClick={() => setShowLogin(true)}
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
