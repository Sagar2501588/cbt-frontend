import React, { useState, useEffect } from "react";
import "./PortalHome.css";
import { FaYoutube, FaTelegramPlane, FaWhatsapp, FaInstagram, FaTwitter } from "react-icons/fa";
import logoImg from "../assets/new_logo.png";
import { useNavigate } from "react-router-dom";
import sankalpB1 from "../assets/Sankalp B1.jpeg";
import sankalpB2 from "../assets/Sankalp B2.jpeg";
import prithvi from "../assets/PRITHVI.jpeg";
import dishantar from "../assets/DISHANTAR.jpeg";
import pratibimb from "../assets/PRATIBIMB.jpeg";
import gati from "../assets/gati.jpeg";
import free from "../assets/free.jpeg";
import { Link } from "react-router-dom";

export default function PortalHome() {
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState(null);
  const courseImages = {
    "sankalp-b1": sankalpB1,
    "sankalp-b2": sankalpB2,
    "prithvi": prithvi,
    "dishantar": dishantar,
    "pratibimb": pratibimb,
    "free-content": free,
    "gati-crash-course": gati,
  };

  // ✅ Correct place for useEffect
  useEffect(() => {
    const name = localStorage.getItem("student_name");
    if (name) {
      setStudentName(name);
    }
  }, []);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.clear();
    setStudentName(null);
    navigate("/");
  };

  const handleBuy = (slug) => {
    const studentId = localStorage.getItem("student_id");

    if (!studentId) {
      localStorage.setItem("pending_course", slug);
      navigate("/login");
      return;
    }

    // ✅ FREE COURSE FIX
    if (slug === "free-content") {
      navigate(`/course/${slug}`); // direct open (no payment)
    } else {
      navigate(`/payment/${slug}`);
    }
  };

  return (
    <div>
      <header className="navbar">
        <div className="logoContainer">
          <img src={logoImg} alt="Logo" className="siteLogo" />
          <h2 className="logo">GEOMATICS GALAXY</h2>
        </div>

        <nav>
          <a href="#home">Home</a>
          <a href="/about">About</a>
          <Link to="/blogs">Blogs</Link>
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

      <section id="home" className="hero">
        <div className="heroContent">
          <h1 className="heroText">
            Welcome to <br /> Galaxy of Geomatics <br /> where we NAVIGATE you to SUCCESS
          </h1>
        </div>
      </section>

      {/* ================= COURSES ================= */}
      <section id="courses" className="courses">
        <div className="coursesHeader">
          <h1>Courses Available</h1>
          <p>
            Choose from our comprehensive range of GATE Geomatics
            preparation courses
          </p>
        </div>

        <div className="courseGrid">

          {/* FREE */}
          <div className="card">
            <div className="cardImage">
              <img src={free} alt="Free Course" />
            </div>

            <div className="cardContent">
              <h3>Free Content</h3>
              <p className="desc">Basic Learning Materials Available</p>

              <div className="cardFooter">
                <span className="price">FREE</span>
                <button onClick={() => handleBuy("free-content")}>
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          {/* SANKALP B1 */}
          <div className="card">
            <div className="cardImage">
              <img src={sankalpB1} alt="Sankalp B1" />
              {/* <span className="badge">Featured</span> */}
            </div>

            <div className="cardContent">
              <h3>Batch SANKALP (B1)</h3>
              <p className="desc">Includes: Part A & Part B1</p>
              <p className="date">Activation: 14 Apr 2026</p>

              <div className="cardFooter">
                <span className="price">₹5000</span>
                <button onClick={() => handleBuy("sankalp-b1")}>
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          {/* SANKALP B2 */}
          <div className="card">
            <div className="cardImage">
              <img src={sankalpB2} alt="Sankalp B2" />
            </div>

            <div className="cardContent">
              <h3>Batch SANKALP (B2)</h3>
              <p className="desc">Includes: Part A & Part B2</p>
              <p className="date">Activation: 14 Apr 2026</p>

              <div className="cardFooter">
                <span className="price">₹5,000</span>
                <button onClick={() => handleBuy("sankalp-b2")}>
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          {/* PRITHVI */}
          <div className="card">
            <div className="cardImage">
              <img src={courseImages["prithvi"]} alt="Prithvi" />
            </div>

            <div className="cardContent">
              <h3>Batch PRITHVI</h3>
              <p className="desc">Includes: Part A Only</p>
              <p className="date">Activation: 14 Apr 2026</p>

              <div className="cardFooter">
                <span className="price">₹3000</span>
                <button onClick={() => handleBuy("prithvi")}>
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          {/* DISHANTAR */}
          <div className="card">
            <div className="cardImage">
              <img src={courseImages["dishantar"]} alt="Dishantar" />
            </div>

            <div className="cardContent">
              <h3>Batch DISHANTAR</h3>
              <p className="desc">Includes: Part B1 Only</p>
              <p className="date">Activation: 14 Aug 2026</p>

              <div className="cardFooter">
                <span className="price">₹3000</span>
                <button onClick={() => handleBuy("dishantar")}>
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          {/* PRATIBIMB */}
          <div className="card">
            <div className="cardImage">
              <img src={courseImages["pratibimb"]} alt="Pratibimb" />
            </div>

            <div className="cardContent">
              <h3>Batch PRATIBIMB</h3>
              <p className="desc">Includes: Part B2 Only</p>
              <p className="date">Activation: 14 Aug 2026</p>

              <div className="cardFooter">
                <span className="price">₹3,000</span>
                <button onClick={() => handleBuy("pratibimb")}>
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          {/* GATI */}
          <div className="card">
            <div className="cardImage">
              <img src={gati} alt="Gati Course" />
            </div>

            <div className="cardContent">
              <h3>Batch GATI – Crash Course</h3>
              <p className="desc">
                Includes: Part A, Part B1 & Part B2
              </p>
              <p className="date">Activation: 02 Oct 2026</p>

              <div className="cardFooter">
                <span className="price">₹4000</span>
                <button onClick={() => handleBuy("gati-crash-course")}>
                  Buy Now
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>


      <section id="contact" className="contact">
        <h1 className="contactTitle">Get In Touch</h1>
        <p className="contactSubtitle">
          Have questions? We're here to help you on your GATE preparation journey
        </p>

        <div className="contactWrapper">

          {/* LEFT */}
          <div className="contactCard">
            <h2>Send us a Message</h2>

            <input type="text" placeholder="Enter your name" />
            <input type="email" placeholder="your.email@example.com" />
            <textarea placeholder="How can we help you?" />

            <button className="sendBtn">Send Message</button>
          </div>

          {/* RIGHT */}
          <div className="contactRight">

            <div className="contactCard">
              <h2>Connect With Us</h2>

              <a href="https://www.youtube.com/@GeomaticsGalaxy" target="_blank" rel="noreferrer">
                <div className="socialItem">
                  <FaYoutube className="icon" />
                  YouTube
                </div>
              </a>

              <a href="https://t.me/galaxyofgeomatics" target="_blank" rel="noreferrer">
                <div className="socialItem">
                  <FaTelegramPlane className="icon" />
                  Telegram
                </div>
              </a>

              {/* <div className="socialItem highlight">
                <FaWhatsapp className="icon" />
                +91 98765 43210
              </div> */}

              <a
                href="https://whatsapp.com/channel/0029VamEEeW545uqRpkY2U2L"
                target="_blank"
                rel="noreferrer"
              >
                <div className="socialItem highlight">
                  <FaWhatsapp className="icon" />
                  WhatsApp Channel
                </div>
              </a>

              <a href="https://www.instagram.com/galaxyofgeomatics" target="_blank" rel="noreferrer">
                <div className="socialItem">
                  <FaInstagram className="icon" />
                  Instagram
                </div>
              </a>

              <a href="https://x.com/GeomaticsGalaxy" target="_blank" rel="noreferrer">
                <div className="socialItem">
                  <FaTwitter className="icon" />
                  Twitter
                </div>
              </a>
            </div>

            <div className="helpCard">
              <h3>Need Immediate Help?</h3>
              <p>Our support team is available 24/7</p>

              <a
                href="https://wa.me/919459889005"
                target="_blank"
                rel="noreferrer"
              >
                <button>Chat Now</button>
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* ================= GATE OFFICIAL LINKS ================= */}
<section className="gateLinksSection">
  <h2>GATE Official Resources</h2>
  <p>
    Access the official GATE website and registration portal directly.
  </p>

  <div className="gateLinksGrid">
    <a
      href="https://gate2027.iitm.ac.in/"
      target="_blank"
      rel="noreferrer"
      className="gateLinkCard"
    >
      <h3>GATE 2027 Official Website</h3>
      {/* <span>gate2027.iitm.ac.in</span> */}
    </a>

    <a
      href="https://goaps.iitm.ac.in/login"
      target="_blank"
      rel="noreferrer"
      className="gateLinkCard"
    >
      <h3>GATE Registration</h3>
      {/* <span>goaps.iitm.ac.in</span> */}
    </a>
  </div>
</section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        © {new Date().getFullYear()} Galaxy Of Geomatics Portal. All Rights Reserved.
      </footer>
    </div>
  );
}