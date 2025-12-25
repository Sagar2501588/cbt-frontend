import React, { useState } from "react";
import "./login.css";
import CryptoJS from "crypto-js";


function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });

  const SECRET_KEY = "Babi@2302";

  function encryptData(text) {
    const key = CryptoJS.SHA256(SECRET_KEY);
    const iv = CryptoJS.lib.WordArray.random(16);

    const encrypted = CryptoJS.AES.encrypt(text, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    // Convert ciphertext WordArray → raw bytes
    const ciphertext = CryptoJS.enc.Base64.parse(encrypted.toString()).words;
    const ctBytes = CryptoJS.lib.WordArray.create(ciphertext, encrypted.ciphertext.sigBytes);

    // Build final (IV + ciphertext) in raw bytes
    const combined = iv.clone().concat(ctBytes);

    return CryptoJS.enc.Base64.stringify(combined);
  }




  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    return Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
  }


  // --------------------------
  // Register Student
  // --------------------------
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // 🔐 Password hash (SHA256)
      const hashedPassword = await hashPassword(formData.password);

      const res = await fetch("http://localhost:8000/register-student", {
        method: "POST",
        body: new URLSearchParams({
          name: formData.name,
          mobile: formData.mobile,   // ➤ plain text mobile
          email: formData.email,     // ➤ plain text email
          password: hashedPassword,  // ➤ hashed password
        }),
      });

      const data = await res.json();
      if (data.error) {
        alert(data.error);
      } else {
        alert(`${data.message}`);
        localStorage.setItem("student_id", data.student_id);
        localStorage.setItem("student_name", formData.name);
        setIsRegister(false);
      }
    } catch (error) {
      alert("Registration failed!");
      console.error(error);
    }
  };




  // --------------------------
  // Login Student
  // --------------------------
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // 🔐 Password hash (SHA256)
      const hashedPassword = await hashPassword(formData.password);

      const res = await fetch("http://localhost:8000/login-student", {
        method: "POST",
        body: new URLSearchParams({
          email: formData.email,        // ➤ plain email
          password: hashedPassword,     // ➤ hashed password
        }),
      });

      const data = await res.json();

      if (data.error) {
        alert(data.error);
      } else {
        alert(`Welcome ${data.name}! Your ID: ${data.student_id}`);
        localStorage.setItem("student_id", data.student_id);
        localStorage.setItem("student_name", data.name);
        window.location.href = "/exam";
      }
    } catch (error) {
      alert("Login failed!");
      console.error(error);
    }
  };




  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{isRegister ? "Student Registration" : "Student Login"}</h2>

        {isRegister ? (
          <form onSubmit={handleRegister}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email ID"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit">Register</button>
            <p>
              Already have an account?{" "}
              <span className="toggle-link" onClick={() => setIsRegister(false)}>
                Login
              </span>
            </p>
          </form>
        ) : (
          <form onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit">Login</button>
            <p>
              New user?{" "}
              <span className="toggle-link" onClick={() => setIsRegister(true)}>
                Register here
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
