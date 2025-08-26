import React, { useState } from "react";
import { auth } from "../../firebase";

const VerifyEmailButton = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendVerification = async () => {
    setMessage("");
    setError("");
    setLoading(true);

    if (!auth.currentUser) {
      setError("No user logged in.");
      setLoading(false);
      return;
    }

    try {
      const idToken = await auth.currentUser.getIdToken(true); 
      const API_KEY = "AIzaSyCv9Gc31utguOMateSGyfk5ac6mpuJYM7E"; 

      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (data.error && data.error.message) {
          setError(data.error.message);
        } else {
          setError("Something went wrong.");
        }
        setLoading(false);
        return;
      }

      setMessage("Verification email sent! ✅ Please check your inbox.");
    } catch (err) {
      console.error("Error sending verification:", err);
      setError("Failed to send verification email.");
    }

    setLoading(false);
  };

  return (
    <div>
      <button onClick={handleSendVerification} disabled={loading} style={{ backgroundColor: "burlywood", color: "blavk", fontWeight: "bold", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}>
        {loading ? "Sending..." : "Verify Email ID"}
      </button>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default VerifyEmailButton;
