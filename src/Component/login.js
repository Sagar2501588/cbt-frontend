import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

// const API_BASE = "http://127.0.0.1:8000";
const API_BASE = "https://cbt-backend-production-a2f9.up.railway.app";

function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const [otpSent, setOtpSent] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  // ================= SEND OTP =================
  const handleSendOtp = async () => {
    if (!formData.mobile) {
      setError("Enter mobile number first.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // ✅ FIX: mobile format correct করা
      const formattedMobile = formData.mobile.trim().startsWith("+")
        ? formData.mobile.trim()
        : "+91" + formData.mobile.trim();

      const res = await fetch(`${API_BASE}/auth/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          mobile: formattedMobile,
        }),
      });

      const data = await res.json();

      if (data.status === "error") {
        setError(data.message);
        setLoading(false);
        return;
      }

      setOtpSent(true);

    } catch (err) {
      setError("Failed to send OTP.");
    }

    setLoading(false);
  };

  // ================= VERIFY OTP =================
  const handleVerifyOtp = async () => {
    if (!otp) {
      setError("Enter OTP.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // ✅ FIX: mobile format correct করা (MOST IMPORTANT)
      const formattedMobile = formData.mobile.trim().startsWith("+")
        ? formData.mobile.trim()
        : "+91" + formData.mobile.trim();

      const res = await fetch(`${API_BASE}/auth/verify-mobile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          mobile: formattedMobile,
          otp: otp,
        }),
      });

      const data = await res.json();

      if (data.status === "error") {
        setError(data.message);
        setLoading(false);
        return;
      }

      setMobileVerified(true);

    } catch (err) {
      setError("OTP verification failed.");
    }

    setLoading(false);
  };

  // ================= LOGIN =================
  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_BASE}/login-student`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();
      console.log("LOGIN RESPONSE:", data);

      if (data.status === "success") {
        localStorage.setItem("student_id", data.student_id);
        localStorage.setItem("student_name", data.name);

        const pendingCourse = localStorage.getItem("pending_course");

        if (pendingCourse) {
          localStorage.removeItem("pending_course");
          navigate(`/payment/${pendingCourse}`);
        } else {
          navigate("/");
        }

      } else {
        alert(data.error || "Login failed");
      }

    } catch (err) {
      console.error("Login error:", err);
    }
  };

  // ================= REGISTER =================
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!mobileVerified) {
      setError("Please verify mobile first.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const hashedPassword = await hashPassword(formData.password);

      const res = await fetch(`${API_BASE}/register-student`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          name: formData.name,
          mobile: formData.mobile,
          email: formData.email,
          password: hashedPassword,
        }),
      });

      const data = await res.json();

      if (data.status === "error") {
        setError(data.message);
        setLoading(false);
        return;
      }

      alert("Registration successful! Please login.");
      setIsLogin(true);

    } catch (err) {
      setError("Registration failed.");
    }

    setLoading(false);
  };

  // return (
  //   <div className="login-container">
  //     <div className="login-box">
  //       <h2>{isLogin ? "Student Login" : "Student Registration"}</h2>

  //       {error && <p className="error-text">{error}</p>}

  //       {isLogin ? (
  //         <form onSubmit={handleLogin}>
  //           <input
  //             type="email"
  //             name="email"
  //             placeholder="Email ID"
  //             value={formData.email}
  //             onChange={handleChange}
  //             required
  //           />

  //           <input
  //             type="password"
  //             name="password"
  //             placeholder="Password"
  //             value={formData.password}
  //             onChange={handleChange}
  //             required
  //           />

  //           <button type="submit">
  //             {loading ? "Logging in..." : "Login"}
  //           </button>

  //           <p style={{ marginTop: "15px" }}>
  //             Don't have an account?{" "}
  //             <span
  //               style={{ color: "blue", cursor: "pointer" }}
  //               onClick={() => setIsLogin(false)}
  //             >
  //               Sign Up
  //             </span>
  //           </p>
  //         </form>
  //       ) : (
  //         <form onSubmit={handleRegister}>
  //           <input
  //             type="text"
  //             name="mobile"
  //             placeholder="Mobile Number"
  //             value={formData.mobile}
  //             onChange={handleChange}
  //             required
  //           />

  //           {!otpSent && (
  //             <button type="button" onClick={handleSendOtp}>
  //               Send OTP
  //             </button>
  //           )}

  //           {otpSent && !mobileVerified && (
  //             <>
  //               <input
  //                 type="text"
  //                 placeholder="Enter OTP"
  //                 value={otp}
  //                 onChange={(e) => setOtp(e.target.value)}
  //               />
  //               <button type="button" onClick={handleVerifyOtp}>
  //                 Verify OTP
  //               </button>
  //             </>
  //           )}

  //           {mobileVerified && (
  //             <p style={{ color: "green" }}>Mobile Verified ✓</p>
  //           )}

  //           <input
  //             type="email"
  //             name="email"
  //             placeholder="Email ID"
  //             value={formData.email}
  //             onChange={handleChange}
  //             required
  //           />

  //           <input
  //             type="text"
  //             name="name"
  //             placeholder="Full Name"
  //             value={formData.name}
  //             onChange={handleChange}
  //             required
  //           />

  //           <input
  //             type="password"
  //             name="password"
  //             placeholder="Create Password"
  //             value={formData.password}
  //             onChange={handleChange}
  //             required
  //           />

  //           <input
  //             type="password"
  //             name="confirmPassword"
  //             placeholder="Confirm Password"
  //             value={formData.confirmPassword}
  //             onChange={handleChange}
  //             required
  //           />

  //           <button type="submit">
  //             {loading ? "Registering..." : "Sign Up"}
  //           </button>

  //           <p style={{ marginTop: "15px" }}>
  //             Already have an account?{" "}
  //             <span
  //               style={{ color: "blue", cursor: "pointer" }}
  //               onClick={() => setIsLogin(true)}
  //             >
  //               Login
  //             </span>
  //           </p>
  //         </form>
  //       )}
  //     </div>
  //   </div>
  // );


  return (
    <div className="login-container">

      {/* LEFT PANEL */}
      <div className="login-left">
        <h1>Welcome Back</h1>
        <p>
          Unlock your learning journey and access premium courses,
          video lectures, and your personalized dashboard.
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="login-right">
        <div className="login-box">

          <h2>{isLogin ? "Sign In" : "Create Account"}</h2>

          {error && <p className="error-text">{error}</p>}

          {isLogin ? (
            <form onSubmit={handleLogin}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button type="submit">
                {loading ? "Logging in..." : "Sign In"}
              </button>

              <p className="toggle-text">
                Don't have an account?{" "}
                <span onClick={() => setIsLogin(false)}>Sign Up</span>
              </p>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <input
                type="text"
                name="mobile"
                placeholder="Mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
              />

              {!otpSent && (
                <button type="button" onClick={handleSendOtp}>
                  Send OTP
                </button>
              )}

              {otpSent && !mobileVerified && (
                <>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <button type="button" onClick={handleVerifyOtp}>
                    Verify OTP
                  </button>
                </>
              )}

              {mobileVerified && (
                <p style={{ color: "green" }}>Verified ✓</p>
              )}

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              <button type="submit">
                {loading ? "Creating..." : "Sign Up"}
              </button>

              <p className="toggle-text">
                Already have an account?{" "}
                <span onClick={() => setIsLogin(true)}>Login</span>
              </p>
            </form>
          )}

        </div>
      </div>
    </div>
  );

}

export default Login;