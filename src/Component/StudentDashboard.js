import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentDashboard.css";
import { API_BASE } from "../config";

function StudentDashboard() {
  const navigate = useNavigate();
  const [guidelineRead, setGuidelineRead] = useState(false);
  const [activeExam, setActiveExam] = useState(null);

  // 🔒 Login guard: login ছাড়া dashboard দেখা যাবে না
  useEffect(() => {
    const studentId = localStorage.getItem("student_id");
    if (!studentId) {
      navigate("/login");
    }
  }, [navigate]);

  // 🟦 Prevent BACK button
  useEffect(() => {
    const disableBack = () => {
      window.history.pushState(null, "", window.location.href);
    };

    disableBack();
    window.addEventListener("popstate", disableBack);

    return () => {
      window.removeEventListener("popstate", disableBack);
    };
  }, []);

  // 🟩 LOAD ACTIVE EXAM FROM BACKEND
  useEffect(() => {
    async function loadExam() {
      try {
        const res = await fetch(`${API_BASE}/active-exam`);
        const data = await res.json();
        setActiveExam(data);
      } catch (err) {
        console.error("❌ Failed to load active exam", err);
      }
    }

    loadExam();
  }, []);

  // 👉 Start Exam Button
  const handleStartExam = () => {
    if (!guidelineRead) {
      alert("Please read and accept the guidelines before starting the exam.");
      return;
    }

    if (!activeExam?.exam_id) {
      alert("No active exam is available.");
      return;
    }

    // 🔥 Redirect to exam based on ACTIVE exam ID
    navigate(`/exam/${activeExam.exam_id}`);
  };

  return (
    <div className="dashboard-container">
      <h2>Student Dashboard</h2>

      {/* SHOW ACTIVE EXAM INFO */}
      <div className="exam-card">
        <h3>{activeExam?`Exam ID: ${activeExam.exam_id}`: "Loading active exam..."}</h3>
        <p><strong>Status:</strong> Active Exam</p>
      </div>

      <div className="guideline-box">
        <h4>Exam Guidelines</h4>
        <ul>
          <li>Read each question carefully before answering.</li>
          <li>Do not refresh or close the window during the exam.</li>
          <li>Once submitted, exam cannot be reattempted.</li>
          <li>The timer will continue even if the tab is minimized.</li>
        </ul>

        <label>
          <input
            type="checkbox"
            checked={guidelineRead}
            onChange={() => setGuidelineRead(!guidelineRead)}
          />
          I have read and understood the guidelines
        </label>
      </div>

      <button
        className="start-btn"
        onClick={handleStartExam}
        disabled={!guidelineRead}
      >
        Start Exam
      </button>
    </div>
  );
}

export default StudentDashboard;
