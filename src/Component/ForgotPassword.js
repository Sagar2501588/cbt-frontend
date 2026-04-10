import React, { useState } from "react";

const API_BASE = "https://api.geomaticsgalaxy.com";

export default function ForgotPassword() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  // 🔹 STEP 1: Send OTP
  const handleSendOtp = async () => {
    if (!mobile) {
      alert("Please enter mobile number");
      return;
    }

    const formattedMobile = mobile.trim().startsWith("+")
      ? mobile.trim()
      : "+91" + mobile.trim();

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          mobile: formattedMobile,
        }),
      });

      const data = await res.json();
      alert(data.message);

      if (data.message) {
        setOtpSent(true);
      }

    } catch (err) {
      alert("Something went wrong");
    }

    setLoading(false);
  };

  // 🔹 STEP 2: Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      alert("Enter OTP");
      return;
    }

    const formattedMobile = mobile.trim().startsWith("+")
      ? mobile.trim()
      : "+91" + mobile.trim();

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/auth/verify-mobile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          mobile: formattedMobile,
          otp,
        }),
      });

      const data = await res.json();
      alert(data.message);

      if (data.status === "success") {
        setOtpVerified(true);
      }

    } catch (err) {
      alert("OTP verification failed");
    }

    setLoading(false);
  };

  // 🔹 STEP 3: Reset Password
  const handleReset = async () => {
    if (!password) {
      alert("Enter new password");
      return;
    }

    const formattedMobile = mobile.trim().startsWith("+")
      ? mobile.trim()
      : "+91" + mobile.trim();

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          mobile: formattedMobile,
          password,
        }),
      });

      const data = await res.json();
      alert(data.message);

    } catch (err) {
      alert("Password reset failed");
    }

    setLoading(false);
  };

  return (
    <div className="login-container">

      {/* LEFT PANEL */}
      <div className="login-left">
        <h1>Forgot Password</h1>
        <p>Reset your password using OTP</p>
      </div>

      {/* RIGHT PANEL */}
      <div className="login-right">
        <div className="login-box">

          <h2>Reset Password</h2>

          {/* MOBILE */}
          <input
            type="text"
            placeholder="Enter mobile (+91XXXXXXXXXX)"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />

          <button onClick={handleSendOtp}>
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>

          {/* OTP SECTION */}
          {otpSent && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <button onClick={handleVerifyOtp}>
                Verify OTP
              </button>
            </>
          )}

          {/* PASSWORD SECTION */}
          {otpVerified && (
            <>
              <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button onClick={handleReset}>
                {loading ? "Processing..." : "Reset Password"}
              </button>
            </>
          )}

        </div>
      </div>
    </div>
  );
}