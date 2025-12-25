import React, { useState, useEffect } from "react";
import "./ExamPage.css";
import Calculator from "./Calculator";
import { API_BASE } from "../config";



function ExamPage() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [review, setReview] = useState({});
  const [visited, setVisited] = useState({});
  const [time, setTime] = useState(180 * 60); // 3 hrs for mock
  const [showCalc, setShowCalc] = useState(false);
  // const studentId = localStorage.getItem("student_id") || "101"; // example
  const studentId = localStorage.getItem("student_id");

  useEffect(() => {
    if (!studentId) {
      alert("Session expired. Please login again.");
      window.location.href = "/login";
    }
  }, [studentId]);

  useEffect(() => {
  const studentId = localStorage.getItem("student_id");
  if (!studentId) {
    navigate("/login");
  }
}, [navigate]);




  useEffect(() => {
    setVisited((prev) => ({ ...prev, [current]: true }));
  }, [current]);

  useEffect(() => {
    async function loadQuestions() {
      try {
        const response = await fetch(`${API_BASE}/questions/1`);
        const data = await response.json();

        const formatted = data.map((q) => ({
          id: q.id,
          question: q.question_text,
          options: [q.option_a, q.option_b, q.option_c, q.option_d],
        }));

        setQuestions(formatted);
        setLoading(false);
      } catch (err) {
        setError("Failed to load questions");
      }
    }
    loadQuestions();
  }, []);

  // Timer
  useEffect(() => {
    if (loading) return;
    if (time === 0) {
      alert("Time Over! Submitting exam...");
      handleSubmit();
      return;
    }
    const timer = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(timer);
  }, [time, loading]);

  const formatTime = () => {
    let h = Math.floor(time / 3600);
    let m = Math.floor((time % 3600) / 60);
    let s = time % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleOptionSelect = (index) => {
    setAnswers({ ...answers, [current]: index });
  };

  const handleNext = async () => {
    if (questions.length === 0) return;

    const currentQuestion = questions[current];
    const selectedIndex = answers[current];

    // ✅ If the student selected an option, save it to DB
    if (selectedIndex !== undefined) {
      const selectedOption = currentQuestion.options[selectedIndex];

      try {
        await fetch(`${API_BASE}/save-answer`, {
          method: "POST",
          body: new URLSearchParams({
            exam_id: "1",          // Static for now
            student_id: studentId,
            question_id: currentQuestion.id,
            selected_option: selectedOption,
          }),
        });
        console.log("✅ Answer saved to DB for question:", currentQuestion.id);
      } catch (error) {
        console.error("❌ Error saving answer:", error);
      }
    }

    // 👉 Move to the next question
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
  };


  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const handleReview = () => {
    setReview({ ...review, [current]: true });
    handleNext();
  };

  const handleClear = () => {
    const updated = { ...answers };
    delete updated[current];
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/calculate-marks/1/${studentId}`
      );
      const result = await res.json();
      alert(`🎯 Exam Submitted!\nYour Score: ${result.total_marks}`);
    } catch (error) {
      alert("❌ Failed to calculate marks.");
      console.error(error);
    }
  };


  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="exam-page">
      {/* -------------------- TOP NAVBAR -------------------- */}
      <div className="exam-navbar">
        <div className="left-nav">
          <h3>Graduate Aptitude Test (Mock)</h3>
          <p>Organizing Institute: XYZ Institute</p>
        </div>
        <div className="right-nav">
          <p className="timer">Time Left: {formatTime()}</p>
          <div className="profile">
            <span className="user-avatar">JS</span>
            <span className="user-name">John Smith</span>
          </div>
        </div>
      </div>

      {/* -------------------- MAIN EXAM LAYOUT -------------------- */}
      <div className="exam-layout">
        {/* LEFT: QUESTIONS */}
        <div className="exam-left">
          <div className="question-header">
            <h4>
              Question No. {current + 1} <span>(MCQ)</span>
            </h4>
          </div>
          <div className="question-body">
            <p className="question-text">{questions[current].question}</p>

            <div className="options">
              {questions[current].options.map((opt, i) => (
                <label key={i} className="option-item">
                  <input
                    type="radio"
                    name={`q${current}`}
                    checked={answers[current] === i}
                    onChange={() => handleOptionSelect(i)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="action-buttons">
            <button onClick={handleReview} className="review-btn">
              Mark for Review & Next
            </button>
            <button onClick={handleClear} className="clear-btn">
              Clear Response
            </button>
            <button className="save-next" onClick={handleNext}>
              Save & Next
            </button>
          </div>
          <div className={`calculator-area ${showCalc ? "open" : ""}`}>
            <button
              className="toggle-calc-btn"
              onClick={() => setShowCalc(!showCalc)}
            >
              {showCalc ? "Hide Calculator" : "Show Calculator"}
            </button>

            {showCalc && <Calculator />}
          </div>


        </div>

        {/* RIGHT: QUESTION PALETTE */}
        <div className="exam-right">
          <h4 className="palette-title">Choose a Question</h4>
          <div className="palette-grid">
            {questions.map((q, index) => {
              let cls = "palette-btn";
              if (!visited[index]) cls += " not-visited";
              else if (review[index] && answers[index] !== undefined)
                cls += " answered-review";
              else if (review[index]) cls += " review";
              else if (answers[index] !== undefined) cls += " answered";
              else cls += " not-attempted";

              return (
                <button
                  key={index}
                  className={cls}
                  onClick={() => setCurrent(index)}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>



          <button className="submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExamPage;

