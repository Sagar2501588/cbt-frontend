import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./StudentDashboard.css";
import { API_BASE } from "../config";

function StudentDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeExam, setActiveExam] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [search, setSearch] = useState("");

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

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Sidebar active helper
  const isActive = (path) => location.pathname === path;

  return (
    <div className="dashboard-layout">

      {/* ================= SIDEBAR ================= */}
      <div className="sidebar">
        <h2 className="logo">Galaxy Of Geomatics</h2>
        <ul>

          {/* 🔥 NEW HOME BUTTON */}
          <li
            className={isActive("/") ? "active" : ""}
            onClick={() => navigate("/")}
          >
            Home
          </li>

          <li
            className={isActive("/dashboard") ? "active" : ""}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </li>

          <li
            className={isActive("/test") ? "active" : ""}
            onClick={() => navigate("/test")}
          >
            Test
          </li>

          <li
            className={isActive("/result") ? "active" : ""}
            onClick={() => navigate("/result")}
          >
            Result
          </li>

          <li
            className={isActive("/study-material") ? "active" : ""}
            onClick={() => navigate("/study-material")}
          >
            Study Material
          </li>

          <li
            className={isActive("/video-lecture") ? "active" : ""}
            onClick={() => navigate("/video-lecture")}
          >
            Video Lecture
          </li>

        </ul>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="main-content">

        {/* TOPBAR */}
        <div className="topbar">
          <div>Welcome, {studentName}</div>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>

        <h2 className="page-title">Test</h2>

        {/* STATS CARDS */}
        <div className="card-row">
          <div className="stat-card">
            <h4>Active Test</h4>
            <p>1</p>
          </div>
          <div className="stat-card">
            <h4>Upcoming Test</h4>
            <p>0</p>
          </div>
          <div className="stat-card">
            <h4>Archived Test</h4>
            <p>115</p>
          </div>
        </div>

        {/* TABLE SECTION */}
        <div className="table-section">
          <div className="table-header">
            <span>Show 10 entries</span>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Test Name</th>
                <th>No. of Questions</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {activeExam && (
                <tr>
                  <td>1</td>
                  <td>GE - Geomatics Engineering - Free Demo Test</td>
                  <td>20</td>
                  <td>
                    <button
                      className="result-btn"
                      onClick={() =>
                        navigate(`/exam/${activeExam.exam_id}`)
                      }
                    >
                      Start
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default StudentDashboard;