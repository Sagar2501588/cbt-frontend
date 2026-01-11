import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentDashboard.css";
import { API_BASE } from "../config";

function StudentDashboard() {
  const navigate = useNavigate();
  const [guidelineRead, setGuidelineRead] = useState(false);
  const [activeExam, setActiveExam] = useState(null);

  // 🔒 Check login
  useEffect(() => {
    const student = localStorage.getItem("student_id");
    if (!student) {
      navigate("/", { replace: true });
    }
  }, []);

  // 🔒 Login guard
  useEffect(() => {
    const studentId = localStorage.getItem("student_id");
    if (!studentId) {
      navigate("/login");
    }
  }, [navigate]);

  // 🟦 Disable BACK button
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

  // 🟩 Load Active Exam
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

  // Start Exam Handler
const handleStartExam = async () => {
  if (!guidelineRead) {
    alert("Please read and accept the guidelines before starting the exam.");
    return;
  }

  const studentId = localStorage.getItem("student_id");

  const res = await fetch(`${API_BASE}/start-exam`, {
    method: "POST",
    body: new URLSearchParams({
      exam_id: activeExam.exam_id,
      student_id: studentId,
    }),
  });

  const data = await res.json();

  if (data.error) {
    alert(data.error);  // 🚫 Show backend block message
    return;             // ❌ Do NOT navigate
  }

  // Exam allowed → enter exam
  navigate(`/exam/${activeExam.exam_id}`);
};



  return (
    <div className="dashboard-container">
      <h2>Student Dashboard</h2>

      {/* Active Exam Info */}
      <div className="exam-card">
        <h3>{activeExam ? `Exam ID: ${activeExam.exam_id}` : "Loading active exam..."}</h3>
        <p>
          <strong>Status:</strong> Active Exam
        </p>
      </div>

      {/* ====================== GUIDELINES BOX ====================== */}
      <div className="guideline-box">
        <h4>General Instructions during Examination</h4>

        <p>Please read the following instructions carefully:</p>

        <ol>
          <li>Total duration of the GATE GEOMATICS (GE) examination is 180 minutes (3 hours).</li>

          <li>
            The countdown timer on your screen will show remaining time. It will continue even if the tab
            is minimized. When the timer becomes zero, the exam will auto-submit and cannot be reattempted.
          </li>

          <li>The ‘Gate Calculator’ is available during the exam.</li>

          <li>You may navigate to any section during the examination.</li>

          <li>
            The Question Palette on the right side will show the status of each question. Click any question
            number to move directly to that question.
          </li>

          <li>
            This paper is divided into three sections:
            <ul>
              <li>
                <strong>General Aptitude (GA):</strong> 10 questions (15 marks)
              </li>
              <li>
                <strong>Part A (Compulsory):</strong> 36 questions (55 marks)
              </li>
              <li>
                <strong>Part B1/B2 (Choose One):</strong> 19 questions (30 marks)
              </li>
            </ul>
          </li>

          <li>
            Total number of questions: <strong>65</strong>, carrying a maximum of{" "}
            <strong>100 marks</strong>.
          </li>

          <li>
            <strong>Marking Scheme:</strong>
            <ul>
              <li>1-mark MCQ → -1/3 for incorrect answer</li>
              <li>2-mark MCQ → -2/3 for incorrect answer</li>
              <li>No negative marking for MSQ & NAT</li>
              <li>No marks for unanswered questions</li>
            </ul>
          </li>

          <li>
            Attempt questions only from the optional section (Part B1 or Part B2) that you selected.
          </li>

          <li>
            <strong>To answer a question:</strong>
            <ul>
              <li>Click on a question number from the Question Palette.</li>

              <li>
                Select an answer:
                <ul>
                  <li>MCQ → click on one bubble</li>
                  <li>MSQ → select one or more checkboxes</li>
                  <li>NAT → enter a number using keypad</li>
                </ul>
              </li>

              <li>Click <strong>Save & Next</strong> to save the answer and move to the next question.</li>

              <li>
                Click <strong>Mark for Review & Next</strong> to save the answer and mark it for review.
              </li>

              <li>Click <strong>Clear Response</strong> to remove chosen answer(s).</li>
            </ul>

            <p>
              Note: If a question is answered but marked for review, it will still be evaluated unless
              changed later.
            </p>
          </li>

          <li>Do not refresh or close the window during the examination.</li>

          <li>
            Read each question carefully before answering. Follow all instructions during the exam for
            submitting your answers.
          </li>
        </ol>

        {/* Checkbox */}
        <label style={{ marginTop: "12px", display: "block" }}>
          <input
            type="checkbox"
            checked={guidelineRead}
            onChange={() => setGuidelineRead(!guidelineRead)}
          />
          &nbsp; I have read and understood the guidelines.
        </label>
      </div>

      {/* ====================== START EXAM BUTTON ====================== */}
      <button className="start-btn" onClick={handleStartExam} disabled={!guidelineRead}>
        Start Exam
      </button>
    </div>
  );
}

export default StudentDashboard;
