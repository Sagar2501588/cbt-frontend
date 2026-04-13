import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./StudentDashboard.css";
import { API_BASE } from "../config";
import sankalpB1 from "../assets/Sankalp B1.jpeg";
import sankalpB2 from "../assets/Sankalp B2.jpeg";
import prithvi from "../assets/PRITHVI.jpeg";
import dishantar from "../assets/DISHANTAR.jpeg";
import pratibimb from "../assets/PRATIBIMB.jpeg";
import gati from "../assets/gati.jpeg";
import free from "../assets/free.jpeg";

const courseImages = {
  "sankalp-b1": sankalpB1,
  "sankalp-b2": sankalpB2,
  "prithvi": prithvi,
  "dishantar": dishantar,
  "pratibimb": pratibimb,
  "free-content": free,
  "gati-crash-course": gati,
};

function StudentDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeExam, setActiveExam] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  // 🔐 Login Check
  useEffect(() => {
    const studentId = localStorage.getItem("student_id");
    const name = localStorage.getItem("student_name");

    if (!studentId) {
      navigate("/login");
    } else {
      setStudentName(name || "Student");
    }
  }, [navigate]);

  // 📘 Load Active Exam
  useEffect(() => {
    async function loadExam() {
      try {
        const res = await fetch(`${API_BASE}/active-exam`);
        const data = await res.json();
        setActiveExam(data);
      } catch (err) {
        console.error("Failed to load exam");
      }
    }
    loadExam();
  }, []);

  useEffect(() => {
    async function loadCourses() {
      try {
        const studentId = localStorage.getItem("student_id");

        const formData = new FormData();
        formData.append("student_id", studentId);

        const res = await fetch(`${API_BASE}/my-courses`, {
          method: "POST",
          body: formData
        });

        const data = await res.json();

        console.log("Courses:", data);

        setCourses(data.courses || []);

      } catch (err) {
        console.error("Failed to load courses");
      }
    }

    loadCourses();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Sidebar active helper
  const isActive = (path) => location.pathname === path;

  return (
    <div className="dashboard-layout">

      {/* ================= SIDEBAR ================= */}
      {/* <div className="sidebar"> */}
      <div className={`sidebar ${showSidebar ? "show" : ""}`}>
        {/* 👉 এইটা ADD করো */}
        <div className="close-btn" onClick={() => setShowSidebar(false)}>
          ✕
        </div>
        <h2 className="logo">Geomatics Galaxy</h2>
        <ul>

          <li onClick={() => navigate("/")}>🏠 Home</li>

          <li
            className={isActive("/dashboard") ? "active" : ""}
            onClick={() => navigate("/dashboard")}
          >
            📊 Dashboard
          </li>

          <li onClick={() => navigate("/video-lecture")}>📚 My Courses</li>
          <li onClick={() => navigate("/test")}>📝 Tests</li>
          {/* <li onClick={() => navigate("/result")}>🏆 Results</li> */}
          <li onClick={() => navigate("/study-material")}>📄 Study Material</li>
          {/* <li onClick={() => navigate("/video-lecture")}>🎥 Video Lectures</li> */}

        </ul>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="main-content">

        {/* 🔵 TOPBAR */}
        <div className="topbar">

          <div className="topbar-left">
            {/* ☰ ONLY MOBILE */}
            <div className="hamburger" onClick={() => setShowSidebar(true)}>
              ☰
            </div>
            <h2>Welcome, {studentName}</h2>
            <p className="subtitle">Let’s dive into the Galaxy of Geomatics!</p>
          </div>

          <input
            className="search-box"
            placeholder="Search courses, tests..."
          />

          <div className="topbar-right">
            <div className="profile-wrapper">

              <div
                className="profile"
                onClick={() => setOpenMenu(!openMenu)}
              >
                <div className="avatar-circle">
                  {studentName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="profile-name">{studentName}</div>
                  <div className="profile-role">Student</div>
                </div>
              </div>

              {openMenu && (
                <div className="dropdown">
                  {/* <div className="dropdown-item">My Profile</div>
                  <div className="dropdown-item">Settings</div> */}
                  <div className="dropdown-divider"></div>
                  <div
                    className="dropdown-item logout"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

        {/* 🟢 STATS */}
        <div className="stats-grid">
          <div className="stat-box">
            <h4>Total Courses</h4>
            <h2>{courses.length}</h2>
          </div>

          <div className="stat-box">
            <h4>Active Tests</h4>
            <h2>Coming Soon</h2>
          </div>

          <div className="stat-box">
            <h4>Completed Tests</h4>
            <h2>Coming Soon</h2>
          </div>

          <div className="stat-box">
            <h4>Performance Score</h4>
            <h2>Coming Soon</h2>
          </div>
        </div>

        {/* 🟣 MY COURSES */}
        <div className="section-header">
          <h2>My Courses</h2>
          {/* <span className="view-all">View All →</span> */}
        </div>

        <div className="course-grid">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div className="courseCard" key={course.id}>

                {/* IMAGE */}
                <div className="courseImageWrapper">
                  <img
                    src={courseImages[course.course_slug] || "https://picsum.photos/400/200"}
                    alt={course.name}
                    className="courseImage"
                  />

                  {course.progress === 100 && (
                    <span className="badge">Completed</span>
                  )}
                </div>

                {/* CONTENT */}
                <div className="courseContent">

                  <h3>{course.name}</h3>
                  <p className="courseSub">{course.course_slug}</p>

                  {/* <div className="progressRow">
                    <span>Progress</span>
                    <span>{course.progress || 0}%</span>
                  </div>

                  <div className="progressBar">
                    <div
                      className="progressFill"
                      style={{ width: `${course.progress || 0}%` }}
                    />
                  </div> */}

                  {/* <div className="courseMeta">
                    <span>⏱ {course.duration || "12 hrs"}</span>
                    <span>📚 {course.total_lessons || 24} Lessons</span>
                  </div> */}

                  <button
                    className="courseBtn"
                    onClick={() => navigate(`/course/${course.course_slug}`)}
                  >
                    {course.progress === 100
                      ? "Review Course"
                      : "Continue Course"}
                  </button>

                </div>
              </div>
            ))
          ) : (
            <p>No courses purchased yet</p>
          )}
        </div>

      </div>
    </div>
  );

}

export default StudentDashboard;