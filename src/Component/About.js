import React, { useState, useEffect } from "react";
import "./About.css";
import logoImg from "../assets/new_logo.png";
import { useNavigate } from "react-router-dom";

const batchDetails = [
  {
    title: "SANKALP B1 Batch",
    subtitle: "Part A + Part B Section I",
    description:
      "Sankalp B1 Batch is a dedicated and structured program designed specifically for aspirants targeting GATE Geomatics Engineering (GE) 2027.",
    focus:
      "This batch focuses exclusively on the complete coverage of Part-A (Common): Engineering Mathematics and Basic Geomatics and Part B Section I: Surveying and Mapping.",
    topics: [
      "Engineering Mathematics",
      "Remote Sensing",
      "Platforms and Sensors",
      "GNSS & GIS",
      "Maps",
      "Land Surveying",
      "Aerial Photogrammetry",
    ],
    points: [
      "Well-structured learning plan for step-by-step preparation",
      "Concept-focused teaching to simplify complex topics",
      "Regular practice and problem-solving sessions",
      "Strategic guidance for effective exam preparation",
    ],
    closing:
      "With Geomatics Galaxy, your preparation is not just about studying — it's about taking a clear and committed step toward success in GATE GE 2027.",
  },
  {
    title: "SANKALP B2 Batch",
    subtitle: "Part A + Part B Section II",
    description:
      "Sankalp B2 Batch is a dedicated and structured program designed specifically for aspirants targeting GATE Geomatics Engineering (GE) 2027.",
    focus:
      "This batch focuses exclusively on the complete coverage of Part-A (Common): Engineering Mathematics and Basic Geomatics and Part B Section II: Image Processing and Analysis.",
    topics: [
      "Engineering Mathematics",
      "Remote Sensing",
      "Platforms and Sensors",
      "GNSS & GIS",
      "Data Quantization and Processing",
      "Digital Image Processing",
      "Radiometric and Geometric Corrections",
      "Image Enhancement",
      "Image Transformation",
      "Image Segmentation and Classification",
    ],
    points: [
      "Well-structured learning plan for step-by-step preparation",
      "Concept-focused teaching to simplify complex topics",
      "Regular practice and problem-solving sessions",
      "Strategic guidance for effective exam preparation",
    ],
    closing:
      "With Geomatics Galaxy, your preparation is not just about studying — it's about taking a clear and committed step toward success in GATE GE 2027.",
  },
  {
    title: "PRITHVI Batch",
    subtitle: "Part A Foundation",
    description:
      "PRITHVI Batch is a dedicated and structured program designed specifically for aspirants targeting GATE Geomatics Engineering (GE) 2027.",
    focus:
      "This batch focuses exclusively on the complete coverage of Part-A (Common): Engineering Mathematics and Basic Geomatics.",
    topics: [
      "Engineering Mathematics",
      "Remote Sensing",
      "Platforms and Sensors",
      "GNSS & GIS",
    ],
    points: [
      "Strong conceptual foundation",
      "Step-by-step structured learning",
      "Clear explanations for basics",
      "Focused preparation strategy",
    ],
    closing:
      "With Geomatics Galaxy, your preparation becomes focused, disciplined, and foundation-driven for GATE GE 2027.",
  },
  {
    title: "DISHANTAR Batch",
    subtitle: "Part B Section I",
    description:
      "DISHANTAR Batch is a dedicated and structured program designed specifically for aspirants targeting GATE Geomatics Engineering (GE) 2027.",
    focus:
      "This batch focuses exclusively on the complete coverage of Part B Section I: Surveying and Mapping.",
    topics: [
      "Maps",
      "Land Surveying",
      "Aerial Photogrammetry",
    ],
    points: [
      "Well-structured learning plan",
      "Topic-focused preparation",
      "Regular practice sessions",
      "Strategic exam guidance",
    ],
    closing:
      "With Geomatics Galaxy, your preparation is not just about studying — it's about taking a clear and committed step toward success in GATE GE 2027.",
  },
  {
    title: "PRATIBIMB Batch",
    subtitle: "Part B Section II",
    description:
      "PRATIBIMB Batch is a focused batch for aspirants targeting the Image Processing and Analysis section of GATE Geomatics Engineering (GE) 2027.",
    focus:
      "This batch covers Part B Section II: Image Processing and Analysis in a structured and concept-oriented way.",
    topics: [
      "Data Quantization and Processing",
      "Digital Image Processing",
      "Radiometric and Geometric Corrections",
      "Image Enhancement",
      "Image Transformation",
      "Image Segmentation and Classification",
    ],
    points: [
      "Concept-driven explanation",
      "Systematic coverage of image processing topics",
      "Practice and problem-solving support",
      "Exam-oriented preparation strategy",
    ],
    closing:
      "PRATIBIMB helps you build confidence in Part B Section II with clarity, focus, and strong conceptual understanding.",
  },
  {
    title: "GATI Batch",
    subtitle: "Crash Course",
    description:
      "GATI Batch is a fast-paced and strategic crash course designed for final-stage preparation for GATE Geomatics Engineering (GE) 2027.",
    focus:
      "This batch is designed for quick revision, targeted practice, and high-impact preparation across important topics.",
    topics: [
      "Important concepts revision",
      "Problem-solving practice",
      "Exam strategy sessions",
      "High-yield topic coverage",
    ],
    points: [
      "Quick revision plan",
      "Focused practice sessions",
      "Important questions discussion",
      "Final exam strategy support",
    ],
    closing:
      "GATI is built for momentum, confidence, and smart preparation when the exam is close.",
  },
];

export default function About() {
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState(null);

  useEffect(() => {
    const name = localStorage.getItem("student_name");
    if (name) setStudentName(name);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setStudentName(null);
    navigate("/");
  };

  return (
    <div className="aboutPage">
      <header className="navbar">
        <div className="logoContainer">
          <img src={logoImg} alt="Logo" className="siteLogo" />
          <h2 className="logo">GEOMATICS GALAXY</h2>
        </div>

        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/#courses">Courses</a>
          <a href="/#contact">Contact</a>
        </nav>

        {studentName ? (
          <div className="userSection">
            <span className="welcomeText">Welcome, {studentName}</span>
            <button className="navBtn" onClick={() => navigate("/dashboard")}>
              Dashboard
            </button>
            <button className="navBtn logoutBtn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <button className="loginBtn" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </header>

      <section className="aboutHero">
        <div className="heroOverlay">
          <h1 className="heroMain">
            Geomatics <span>Galaxy</span>
          </h1>
          <h2>Welcome to Galaxy of Geomatics</h2>
          <p className="heroTagline">Where we NAVIGATE you to SUCCESS</p>
          <p className="heroDesc">
            Geomatics Galaxy is your one-stop platform for mastering GATE
            Geomatics with clarity and confidence.
          </p>
        </div>
      </section>

      <section className="aboutContent">
        <h2 className="contentTitle">About Our Batches</h2>
        <p className="contentText">
          We provide structured, exam-focused, and concept-driven learning for
          GATE Geomatics Engineering aspirants. Each batch is carefully designed
          to simplify complex topics and help students prepare systematically.
        </p>
      </section>

      <section className="batchSection">
        <h2 className="sectionTitle">
          Our <span>Batches</span>
        </h2>

        <div className="batchGrid">
          {batchDetails.map((batch) => (
            <article className="batchCard" key={batch.title}>
              <div className="batchTop">
                <h3>{batch.title}</h3>
                <p className="batchSubtitle">{batch.subtitle}</p>
              </div>

              <p className="batchText">{batch.description}</p>
              <p className="batchText">{batch.focus}</p>

              <div className="miniSection">
                <h4>Topics Covered</h4>
                <ul className="topicList">
                  {batch.topics.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
              </div>

              <div className="miniSection">
                <h4>Key Highlights</h4>
                <ul className="pointList">
                  {batch.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>

              <p className="batchClosing">{batch.closing}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}