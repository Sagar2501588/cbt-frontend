import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentDashboard.css";

function StudentDashboard() {
  const [guidelineRead, setGuidelineRead] = useState(false);
  const navigate = useNavigate();

  // 🔒 Login guard: login ছাড়া dashboard দেখা যাবে না
  useEffect(() => {
    const studentId = localStorage.getItem("student_id");
    if (!studentId) {
      navigate("/login");
    }
  }, [navigate]);

  const handleStartExam = () => {
    if (!guidelineRead) {
      alert("Please read and accept the guidelines before starting the exam.");
      return;
    }

    // ✅ Proper redirect to exam page
    navigate("/ExamPage");
  };

  return (
    <div className="dashboard-container">
      <h2>Student Dashboard</h2>

      <div className="exam-card">
        <h3>CBT Model Examination</h3>
        <p><strong>Subject:</strong> Computer Basics</p>
        <p><strong>Duration:</strong> 60 minutes</p>
        <p><strong>Total Questions:</strong> 50</p>
        <p><strong>Status:</strong> Upcoming</p>
      </div>

      <div className="guideline-box">
        <h4>Exam Guidelines</h4>
        <ul>
          <li>Read each question carefully before answering.</li>
          <li>Do not refresh or close the window during the exam.</li>
          <li>Once you submit, the exam cannot be reattempted.</li>
          <li>The timer will continue even if you minimize the tab.</li>
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
