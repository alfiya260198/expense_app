import React, { useState } from "react";
import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";
import Logo from "../../../src/assets/images/newlogo.png";
import FormImage from "../../../src/assets/images/form-image.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("✅ A password reset link has been sent to your email.");
    } catch (err) {
      switch (err.code) {
        case "auth/invalid-email":
          setError("Invalid email format ❌");
          break;
        case "auth/user-not-found":
          setError("No account found with this email ❌");
          break;
        default:
          setError("Failed to send reset email. Try again ❌");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup">
      <div className="form-box">
        {/* Left Image Box */}
        <div className="form-left-box">
          <img src={FormImage} alt="Form" />
        </div>

        {/* Right Form Box */}
        <div className="form-right-box">
          <div className="signup-title">
            <img src={Logo} alt="Logo" />
            <span>Sharpener</span>
          </div>

          <form className="signup-form" onSubmit={handlePasswordReset}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit" className="signup-btn" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          {message && <p style={{ color: "green", marginTop: "10px" }}>{message}</p>}
          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

          <div className="login-link">
            <p className="login-link-text">
              <span>Remembered password?</span>{" "}
              <Link to="/login" className="link-btn">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
