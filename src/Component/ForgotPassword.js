import React, { useState } from "react";

const API_BASE = "https://api.geomaticsgalaxy.com";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          email: email,
        }),
      });

      const data = await res.json();

      // ✅ Only ONE alert
      alert(data.message);

      // ❌ REMOVE reset_link logic completely
      // (OTP flow use korbo, link na)

    } catch (err) {
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="login-container">

      {/* LEFT PANEL */}
      <div className="login-left">
        <h1>Forgot Password</h1>
        <p>Enter your email to receive OTP</p>
      </div>

      {/* RIGHT PANEL */}
      <div className="login-right">
        <div className="login-box">

          <h2>Reset Password</h2>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button onClick={handleSubmit}>
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>

        </div>
      </div>
    </div>
  );
}