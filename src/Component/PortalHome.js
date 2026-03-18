import React, { useState, useEffect } from "react";
import "./PortalHome.css";
import logoImg from "../assets/new_logo.png";
import { useNavigate } from "react-router-dom";

export default function PortalHome() {
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState(null);

  // 🔹 Load login state
  useEffect(() => {
    const name = localStorage.getItem("student_name");
    if (name) {
      setStudentName(name);
    }
  }, []);

  // 🔹 Logout function
  const handleLogout = () => {
    localStorage.clear();
    setStudentName(null);
    navigate("/");
  };

  // 🔹 Common Buy Function
  const handleBuy = (slug) => {
    const studentId = localStorage.getItem("student_id");

    if (!studentId) {
      localStorage.setItem("pending_course", slug);
      navigate("/login");
    } else {
      navigate(`/payment/${slug}`);
    }
  };

  return (
    <div>

      {/* ================= NAVBAR ================= */}
      <header className="navbar">
        <div className="logoContainer">
          <img src={logoImg} alt="Logo" className="siteLogo" />
          <h2 className="logo">GEOMATICS GALAXY</h2>
        </div>

        <nav>
          <a href="#home">Home</a>
          <a href="#courses">Courses</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* 🔥 Dynamic Navbar */}
        {studentName ? (
          <div className="userSection">
            <span className="welcomeText">Welcome, {studentName}</span>
            <button
              className="navBtn"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </button>
            <button
              className="navBtn logoutBtn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            className="loginBtn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </header>

      {/* ================= HERO ================= */}
      <section id="home" className="hero"></section>

      {/* ================= COURSES ================= */}
      <section id="courses" className="courses">
        <h2>Courses Available</h2>

        <div className="courseGrid">

          <div className="courseCard">
            <h3>Free Content</h3>
            <p>Basic Learning Materials Available</p>
            <button className="buyBtn" onClick={() => handleBuy("free-content")}>
              Buy Now
            </button>
          </div>

          <div className="courseCard">
            <h3>Batch SANKALP (B1)</h3>
            <p>Includes: Part A & Part B1</p>
            <p className="activationDate">Activation Date: 14 Apr 2026</p>
            <button className="buyBtn" onClick={() => handleBuy("sankalp-b1")}>
              Buy Now
            </button>
          </div>

          <div className="courseCard">
            <h3>Batch SANKALP (B2)</h3>
            <p>Includes: Part A & Part B2</p>
            <p className="activationDate">Activation Date: 14 Apr 2026</p>
            <button className="buyBtn" onClick={() => handleBuy("sankalp-b2")}>
              Buy Now
            </button>
          </div>

          <div className="courseCard">
            <h3>Batch PRITHVI</h3>
            <p>Includes: Part A Only</p>
            <p className="activationDate">Activation Date: 14 Apr 2026</p>
            <button className="buyBtn" onClick={() => handleBuy("prithvi")}>
              Buy Now
            </button>
          </div>

          <div className="courseCard">
            <h3>Batch DISHANTAR</h3>
            <p>Includes: Part B1 Only</p>
            <p className="activationDate">Activation Date: 14 Aug 2026</p>
            <button className="buyBtn" onClick={() => handleBuy("dishantar")}>
              Buy Now
            </button>
          </div>

          <div className="courseCard">
            <h3>Batch PRATIBIMB</h3>
            <p>Includes: Part B2 Only</p>
            <p className="activationDate">Activation Date: 14 Aug 2026</p>
            <button className="buyBtn" onClick={() => handleBuy("pratibimb")}>
              Buy Now
            </button>
          </div>

          <div className="courseCard">
            <h3>Batch GATI – Crash Course</h3>
            <p>Includes: Part A, Part B1 & Part B2</p>
            <p className="activationDate">Activation Date: 02 Oct 2026</p>
            <button className="buyBtn" onClick={() => handleBuy("gati-crash-course")}>
              Buy Now
            </button>
          </div>

        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="contact">
        <h2>Contact Us</h2>

        <div className="contactContainer">

          <form className="contactForm">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Message..." required></textarea>
            <button type="submit">Send Message</button>
          </form>

          <div className="contactInfo">
            <h3>Connect With Us</h3>

            <a href="https://www.youtube.com/@GeomaticsGalaxy" target="_blank" rel="noreferrer">YouTube</a>
            <a href="https://t.me/galaxyofgeomatics" target="_blank" rel="noreferrer">Telegram</a>
            <a href="https://whatsapp.com/channel/0029VamEEeW545uqRpkY2U2L" target="_blank" rel="noreferrer">WhatsApp Channel</a>
            <a href="https://www.instagram.com/galaxyofgeomatics" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://x.com/GeomaticsGalaxy" target="_blank" rel="noreferrer">X (Twitter)</a>

            <p className="contactNumber">9459889005 (WhatsApp)</p>
          </div>

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        © {new Date().getFullYear()} Galaxy Of Geomatics Portal. All Rights Reserved.
      </footer>

    </div>
  );
}