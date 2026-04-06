import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./StudentDashboard.css";
import { API_BASE } from "../config";
import sankalpB1 from "../assets/Sankalp B1.jpeg";
import sankalpB2 from "../assets/Sankalp B2.jpeg";
import prithvi from "../assets/PRITHVI.jpeg";
import dishantar from "../assets/DISHANTAR.jpeg";
import pratibimb from "../assets/PRATIBIMB.jpeg";

const courseImages = {
  "sankalp-b1": sankalpB1,
  "sankalp-b2": sankalpB2,
  "prithvi": prithvi,
  "dishantar": dishantar,
  "pratibimb": pratibimb,
};

function StudentDashboard() {
  const navigate = useNavigate();
  const location = useLocation();


  const [activeExam, setActiveExam] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);

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

  // return (
  //   <div className="dashboard-layout">

  //     {/* ================= SIDEBAR ================= */}
  //     <div className="sidebar">
  //       <h2 className="logo">Galaxy Of Geomatics</h2>
  //       <ul>

  //         {/* 🔥 NEW HOME BUTTON */}
  //         <li
  //           className={isActive("/") ? "active" : ""}
  //           onClick={() => navigate("/")}
  //         >
  //           Home
  //         </li>

  //         <li
  //           className={isActive("/dashboard") ? "active" : ""}
  //           onClick={() => navigate("/dashboard")}
  //         >
  //           Dashboard
  //         </li>

  //         <li
  //           className={isActive("/test") ? "active" : ""}
  //           onClick={() => navigate("/test")}
  //         >
  //           Test
  //         </li>

  //         <li
  //           className={isActive("/result") ? "active" : ""}
  //           onClick={() => navigate("/result")}
  //         >
  //           Result
  //         </li>

  //         <li
  //           className={isActive("/study-material") ? "active" : ""}
  //           onClick={() => navigate("/study-material")}
  //         >
  //           Study Material
  //         </li>

  //         <li
  //           className={isActive("/video-lecture") ? "active" : ""}
  //           onClick={() => navigate("/video-lecture")}
  //         >
  //           Video Lecture
  //         </li>

  //       </ul>
  //     </div>

  //     {/* ================= MAIN CONTENT ================= */}
  //     <div className="main-content">

  //       {/* TOPBAR */}
  //       <div className="topbar">
  //         <div>Welcome, {studentName}</div>
  //         <button onClick={handleLogout} className="logout-btn">
  //           Logout
  //         </button>
  //       </div>

  //       <h2 className="page-title">Test</h2>

  //       {/* STATS CARDS */}
  //       <div className="card-row">
  //         <div className="stat-card">
  //           <h4>Active Test</h4>
  //           <p>1</p>
  //         </div>
  //         <div className="stat-card">
  //           <h4>Upcoming Test</h4>
  //           <p>0</p>
  //         </div>
  //         <div className="stat-card">
  //           <h4>Archived Test</h4>
  //           <p>115</p>
  //         </div>
  //       </div>

  //       {/* TABLE SECTION */}
  //       <div className="table-section">
  //         <div className="table-header">
  //           <span>Show 10 entries</span>
  //           <input
  //             type="text"
  //             placeholder="Search..."
  //             value={search}
  //             onChange={(e) => setSearch(e.target.value)}
  //           />
  //         </div>

  //         <table>
  //           <thead>
  //             <tr>
  //               <th>#</th>
  //               <th>Test Name</th>
  //               <th>No. of Questions</th>
  //               <th>Action</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {activeExam && (
  //               <tr>
  //                 <td>1</td>
  //                 <td>GE - Geomatics Engineering - Free Demo Test</td>
  //                 <td>20</td>
  //                 <td>
  //                   <button
  //                     className="result-btn"
  //                     onClick={() =>
  //                       navigate(`/exam/${activeExam.exam_id}`)
  //                     }
  //                   >
  //                     Start
  //                   </button>
  //                 </td>
  //               </tr>
  //             )}
  //           </tbody>
  //         </table>
  //       </div>

  //     </div>
  //   </div>
  // );


  return (
    <div className="dashboard-layout">

      {/* ================= SIDEBAR ================= */}
      <div className="sidebar">
        <h2 className="logo">Geomatics Galaxy</h2>
        <ul>

          <li onClick={() => navigate("/")}>🏠 Home</li>

          <li
            className={isActive("/dashboard") ? "active" : ""}
            onClick={() => navigate("/dashboard")}
          >
            📊 Dashboard
          </li>

          <li onClick={() => navigate("/courses")}>📚 My Courses</li>
          <li onClick={() => navigate("/test")}>📝 Tests</li>
          <li onClick={() => navigate("/result")}>🏆 Results</li>
          <li onClick={() => navigate("/study-material")}>📄 Study Material</li>
          <li onClick={() => navigate("/video-lecture")}>🎥 Video Lectures</li>

        </ul>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="main-content">

        {/* 🔵 TOPBAR */}
        {/* <div className="topbar">
        <div>
          <h2>Welcome, {studentName}</h2>
          <p className="subtitle">Let's continue your learning journey!</p>
        </div>

        <input
          className="search-box"
          placeholder="Search courses, tests..."
        />

        <div className="profile">
          👤 {studentName}
        </div>
      </div> */}

        <div className="topbar">

          <div className="topbar-left">
            <h2>Welcome, {studentName}</h2>
            <p className="subtitle">Let's continue your learning journey!</p>
          </div>

          <input
            className="search-box"
            placeholder="Search courses, tests..."
          />

          <div className="topbar-right">
            🔔
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
                  <div className="dropdown-item">My Profile</div>
                  <div className="dropdown-item">Settings</div>
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
          <span className="view-all">View All →</span>
        </div>

        <div className="course-grid">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div className="course-card" key={course.id}>

                {/* IMAGE */}
                <div className="course-image-wrapper">
                  <img
                    src={courseImages[course.course_slug] || "https://picsum.photos/300/200"}
                    alt={course.name}
                    className="course-img"
                  />

                  <div className="play-icon">▶</div>
                </div>

                {/* CONTENT */}
                <div className="course-content">

                  <h3>{course.name}</h3>

                  <div className="progress-row">
                    <span>Progress</span>
                    <span className="progress-percent">
                      {course.progress || 0}%
                    </span>
                  </div>

                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${course.progress || 0}%` }}
                    ></div>
                  </div>

                  <button
                    className="continue-btn"
                    onClick={() => navigate(`/course/${course.course_slug}`)}
                  >
                    Continue Learning
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