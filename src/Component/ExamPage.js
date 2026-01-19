import React, { useState, useEffect } from "react";
import "./ExamPage.css";
import Calculator from "./Calculator";
import { API_BASE } from "../config";
import { useNavigate } from "react-router-dom"; // ✅ এই line টা ছিল না
import { useParams } from "react-router-dom";
import { BlockMath, InlineMath } from "react-katex";






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
  const studentId = (localStorage.getItem("student_id") || "").trim();
  const navigate = useNavigate(); // ✅ define
  const studentName = localStorage.getItem("student_name") || "Student";
  const { examId } = useParams();
  const examIdNum = parseInt(examId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [msqAnswers, setMsqAnswers] = useState({});  // MSQ checkbox
  const [natAnswers, setNatAnswers] = useState({});  // NAT input


  useEffect(() => {
    if (examIdNum) {
      localStorage.setItem("exam_id", examIdNum);
    }
  }, [examIdNum]);







  const renderMath = (text) => {
    if (!text) return "";

    // latex keyword থাকলে math render করবে
    const isLatex =
      text.includes("\\frac") ||
      text.includes("\\exp") ||
      text.includes("\\left") ||
      text.includes("\\right") ||
      text.includes("^") ||
      text.includes("_");

    return isLatex ? <BlockMath math={text} /> : text;
  };

  const isImageUrl = (text) => {
    if (!text) return false;
    return typeof text === "string" && text.startsWith("http");
  };

  const renderContent = (text) => {
    if (!text) return "";

    // ✅ if image url
    if (isImageUrl(text)) {
      return (
        <img
          src={text}
          alt="img"
          style={{
            maxWidth: "100%",
            maxHeight: "250px",
            borderRadius: "10px",
            border: "1px solid #dce3ec",
            marginTop: "10px"
          }}
        />
      );
    }

    // ✅ otherwise show latex/text
    return renderMath(text);
  };




  const getInitials = (name) => {
    if (!name) return "NA";

    const parts = name.trim().split(" ");

    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }

    return (
      parts[0].charAt(0).toUpperCase() +
      parts[1].charAt(0).toUpperCase()
    );
  };


  const saveAnswer = async (questionId, selectedOption) => {
    if (!studentId) {
      console.error("❌ No student_id in localStorage");
      console.log("Saving answer:", questionId, selectedOption);
      return;
    }

    // Convert STD101 → 101 safely
    // const numericStudentId = Number(studentId.replace(/\D/g, "")) || null;

    // if (!numericStudentId) {
    //   console.error("❌ student_id could not be converted:", studentId);
    //   return;
    // }

    const formData = new FormData();
    formData.append("exam_id", examIdNum);
    formData.append("student_id", studentId.trim());
    formData.append("question_id", questionId);
    formData.append("selected_option", selectedOption);

    try {
      const res = await fetch(`${API_BASE}/save-answer`, {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      console.log("✅ Answer saved:", data);
    } catch (err) {
      console.error("❌ Save error:", err);
    }
  };












  //   useEffect(() => {
  //     if (!studentId) {
  //       alert("Session expired. Please login again.");
  //       window.location.href = "/login";
  //     }
  //   }, [studentId]);

  //   useEffect(() => {
  //   const studentId = localStorage.getItem("student_id");
  //   if (!studentId) {
  //     navigate("/login");
  //   }
  // }, [navigate]);


  useEffect(() => {
    if (!studentId) {
      navigate("/");
    }
  }, [studentId, navigate]);

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


  useEffect(() => {
    const confirmExit = (e) => {
      e.preventDefault();
      e.returnValue = ""; // Chrome requires returnValue
    };

    window.addEventListener("beforeunload", confirmExit);

    return () => {
      window.removeEventListener("beforeunload", confirmExit);
    };
  }, []);







  useEffect(() => {
    setVisited((prev) => ({ ...prev, [current]: true }));
  }, [current]);

  useEffect(() => {
    async function loadQuestions() {
      try {
        const response = await fetch(`${API_BASE}/questions/${examIdNum}`);
        const data = await response.json();

        const formatted = data.map((q) => ({
          id: q.id,
          question: q.question_text,
          question_image_url: q.question_image_url,
          options: [q.option_a, q.option_b, q.option_c, q.option_d],
          question_type: q.question_type,   // ✅ add
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

  // const handleOptionSelect = (option) => {
  //   const qId = questions[currentIndex].id;  // backend question id

  //   setSelectedAnswers((prev) => ({
  //     ...prev,
  //     [qId]: option,
  //   }));

  //   // Call save API
  //   saveAnswer(qId, option);
  // };

  // const handleOptionSelect = (optionIndex) => {
  //   const qId = questions[current].id;
  //   const selectedOptionText = questions[current].options[optionIndex];

  //   // Save answer to state (UI highlight)
  //   setAnswers((prev) => ({
  //     ...prev,
  //     [current]: optionIndex,
  //   }));

  //   // Save to backend
  //   saveAnswer(qId, selectedOptionText);
  // };

  const goNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
  };


  // const handleOptionSelect = (optionIndex) => {
  //   const qId = questions[current].id;
  //   const qType = questions[current].question_type;
  //   // const qId = questions?.[current]?.id;
  //       if (!qId) return;

  //   // A/B/C/D mapping
  //   const optLetter = ["A", "B", "C", "D"][optionIndex];

  //   // ✅ MCQ → Single select
  //   if (qType === "MCQ") {
  //     setAnswers((prev) => ({
  //       ...prev,
  //       [current]: optLetter,
  //     }));

  //     // backend expects "A"/"B"/"C"/"D"
  //     saveAnswer(qId, optLetter);
  //   }

  //   // ✅ MSQ → Multiple select (checkbox)
  //   else if (qType === "MSQ") {
  //     const prevSelected = answers[current] || []; // should be array now
  //     let updated = [];

  //     if (prevSelected.includes(optLetter)) {
  //       updated = prevSelected.filter((x) => x !== optLetter);
  //     } else {
  //       updated = [...prevSelected, optLetter];
  //     }

  //     updated.sort(); // keep stable order

  //     setAnswers((prev) => ({
  //       ...prev,
  //       [current]: updated,
  //     }));

  //     // backend expects "A,B,D"
  //     saveAnswer(qId, updated.join(","));
  //   }
  // };


  const handleOptionSelect = (optionIndex) => {
    const qId = questions[current].id;
    const qType = questions[current].question_type;
    if (!qId) return;

    const optLetter = ["A", "B", "C", "D"][optionIndex];

    if (qType === "MCQ") {
      setAnswers((prev) => ({
        ...prev,
        [current]: optLetter,  // Save the selected answer
      }));
      saveAnswer(qId, optLetter);  // Save the answer to the backend
    } else if (qType === "MSQ") {
      const prevSelected = answers[current] || [];
      let updated = [];

      if (prevSelected.includes(optLetter)) {
        updated = prevSelected.filter((x) => x !== optLetter);
      } else {
        updated = [...prevSelected, optLetter];
      }

      updated.sort();
      setAnswers((prev) => ({
        ...prev,
        [current]: updated,  // Save the updated answer (multiple options)
      }));

      saveAnswer(qId, updated.join(","));
    }
  };

  const handleNatChange = (value) => {
    const qId = questions[current].id;
    if (!qId) return;
    setAnswers((prev) => ({
      ...prev,
      [current]: value,
    }));

    // backend expects typed input like "73"
    saveAnswer(qId, value);
  };




  // const handleNext = async () => {
  //   if (questions.length === 0) return;

  //   const currentQuestion = questions[current];
  //   const selectedIndex = answers[current];

  //   // ✅ If the student selected an option, save it to DB
  //   if (selectedIndex !== undefined) {
  //     const selectedOption = currentQuestion.options[selectedIndex];

  //     try {
  //       await fetch(`${API_BASE}/save-answer`, {
  //         method: "POST",
  //         body: new URLSearchParams({
  //           exam_id: "1",          // Static for now
  //           student_id: studentId,
  //           question_id: currentQuestion.id,
  //           selected_option: selectedOption,
  //         }),
  //       });
  //       console.log("✅ Answer saved to DB for question:", currentQuestion.id);
  //     } catch (error) {
  //       console.error("❌ Error saving answer:", error);
  //     }
  //   }

  //   // 👉 Move to the next question
  //   if (current < questions.length - 1) {
  //     setCurrent(current + 1);
  //   }
  // };

  const handleNext = () => {
    if (questions.length === 0) return;

    // Just move to next question (saving already handled in handleOptionSelect)
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
  };


  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };


  // const handleReview = () => {
  //   setReview({ ...review, [current]: true });
  //   handleNext();
  // };

  const handleReview = () => {
    setReview((prev) => ({ ...prev, [current]: true }));  // Mark the current question for review
    handleNext();  // Move to the next question
  };


  const handleClear = () => {
    const updated = { ...answers };
    delete updated[current];
    setAnswers(updated);
  };

  // const handleSubmit = async () => {
  //   try {
  //     const res = await fetch(
  //       `${API_BASE}/calculate-marks/1/${studentId}`
  //     );
  //     const result = await res.json();
  //     alert(`🎯 Exam Submitted!\nYour Score: ${result.total_marks}`);
  //   } catch (error) {
  //     alert("❌ Failed to calculate marks.");
  //     console.error(error);
  //   }
  // };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${API_BASE}/calculate-marks/${examIdNum}/${studentId.trim()}`
      );

      if (!response.ok) {
        throw new Error("Failed to calculate marks");
      }

      const result = await response.json();
      localStorage.setItem("last_score", result.total_marks);

      window.onbeforeunload = null;
      navigate("/result");

    } catch (error) {
      console.error("❌ Error submitting exam:", error);
    }
  };




  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  if (loading) return <h2>Loading questions...</h2>;

  if (!questions.length) {
    return <h2>No questions found</h2>;
  }

  if (!questions[current]) {
    return <h2>Loading current question...</h2>;
  }


  return (
    <div className="exam-page">
      {/* -------------------- TOP NAVBAR -------------------- */}
      <div className="exam-navbar">
        <div className="left-nav">
          <h3>Graduate Aptitude Test (Mock)</h3>
          <p>Organizing Institute: Geomatics Galaxy (A Branch of Haru Geomatics)</p>
        </div>
        <div className="right-nav">
          <p className="timer">Time Left: {formatTime()}</p>
          <div className="profile">
            <span className="user-avatar">{getInitials(studentName)}</span>
            <span className="user-name">{studentName}</span>
          </div>
        </div>
      </div>

      {/* -------------------- MAIN EXAM LAYOUT -------------------- */}
      <div className="exam-layout">
        {/* LEFT: QUESTIONS */}
        <div className="exam-left">
          <div className="question-header">
            <h4>
              Question No. {current + 1} <span>({questions[current]?.question_type})</span>
            </h4>
          </div>
          <div className="question-body">
            {/* QUESTION */}
            <div className="question-text">
              {renderMath(questions[current]?.question)}
            </div>

            {/* ✅ Question Image (if available) */}
            {questions[current]?.question_image_url && (
              <div style={{ marginTop: "15px", textAlign: "center" }}>
                <img
                  src={questions[current].question_image_url}
                  alt="question"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "350px",
                    borderRadius: "10px",
                    border: "1px solid #dce3ec",
                  }}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            )}


            <div className="options">

              {/* ✅ MCQ */}
              {questions[current]?.question_type === "MCQ" && (
                ["A", "B", "C", "D"].map((letter, i) => (
                  <label key={i} className="option-item">
                    <input
                      type="radio"
                      name={`q${current}`}
                      checked={answers[current] === letter}
                      onChange={() => handleOptionSelect(i)}
                    />
                    {renderContent(questions[current]?.options[i])}

                  </label>
                ))
              )}

              {/* ✅ MSQ */}
              {questions[current]?.question_type === "MSQ" && (
                ["A", "B", "C", "D"].map((letter, i) => (
                  <label key={i} className="option-item">
                    <input
                      type="checkbox"
                      checked={(answers[current] || []).includes(letter)}
                      onChange={() => handleOptionSelect(i)}
                    />
                    {renderContent(questions[current]?.options[i])}
                  </label>
                ))
              )}

              {/* ✅ NAT */}
              {questions[current]?.question_type === "NAT" && (
                <div style={{ marginTop: "15px" }}>
                  <input
                    type="text"
                    value={answers[current] || ""}
                    onChange={(e) => handleNatChange(e.target.value)}
                    placeholder="Enter your answer"
                    style={{
                      width: "90%",
                      padding: "12px",
                      borderRadius: "6px",
                      border: "1px solid #dce3ec",
                      fontSize: "16px"
                    }}
                  />
                </div>
              )}

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
            {/* {questions.map((q, index) => {
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
            })} */}

            {questions.map((q, index) => {
              let cls = "palette-btn";

              // Apply classes for visited, answered, and reviewed questions
              if (!visited[index]) cls += " not-visited";
              else if (review[index] && answers[index] !== undefined)
                cls += " answered-review";  // Green for answered & reviewed
              else if (review[index]) cls += " review";  // Yellow for reviewed only
              else if (answers[index] !== undefined) cls += " answered";  // Light green for answered
              else cls += " not-attempted";  // Red for not attempted

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

