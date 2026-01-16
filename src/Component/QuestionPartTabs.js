import React, { useState, useEffect } from "react";
import { API_BASE } from "../config";

const ExamParts = ({ examIdNum }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePart, setActivePart] = useState("General Aptitude");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Fetch questions from the API
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetch(`${API_BASE}/questions/${examIdNum}`);
        const data = await response.json();

        // Assign parts to questions based on question_id
        const formattedQuestions = data.map((q) => ({
          ...q,
          part: getPart(q.question_id),
        }));

        setQuestions(formattedQuestions);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load questions", err);
        setLoading(true);
      }
    };

    loadQuestions();
  }, [examIdNum]);

  // Define parts based on question_id
  const getPart = (questionId) => {
    if (questionId >= 1 && questionId <= 10) return "General Aptitude";
    if (questionId >= 11 && questionId <= 46) return "Part A";
    if (questionId >= 47 && questionId <= 65) return "Part B - Section I";
    if (questionId >= 66 && questionId <= 84) return "Part B - Section II";
    return "Unknown Part";
  };

  // Filter questions by active part
  const filteredQuestions = questions.filter((q) => q.part === activePart);

  // Handle the question navigation
  const goNext = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goPrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (loading) {
    return <h2>Loading questions...</h2>;
  }

  if (!filteredQuestions.length) {
    return <h2>No questions found in this part.</h2>;
  }

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  return (
    <div>
      {/* Part Navigation Tabs */}
      <div style={{ display: "flex", gap: "10px", margin: "20px 0" }}>
        {["General Aptitude", "Part A", "Part B - Section I", "Part B - Section II"].map((part) => (
          <button
            key={part}
            onClick={() => {
              setActivePart(part);
              setCurrentQuestionIndex(0); // Reset to the first question of the selected part
            }}
            style={{
              padding: "8px 14px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              background: activePart === part ? "#e6f0ff" : "white",
              cursor: "pointer",
            }}
          >
            {part}
          </button>
        ))}
      </div>

      {/* Current Question */}
      <div>
        <h3>{`Question No. ${currentQuestion.question_id}`}</h3>
        <p>{currentQuestion.question_text}</p>
        {/* Display Options for MCQ, MSQ, or NAT */}
        {currentQuestion.question_type === "MCQ" && (
          <div>
            {["A", "B", "C", "D"].map((letter, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name={`q${currentQuestion.question_id}`}
                  value={letter}
                />
                {currentQuestion[`option_${letter.toLowerCase()}`]}
              </label>
            ))}
          </div>
        )}

        {currentQuestion.question_type === "MSQ" && (
          <div>
            {["A", "B", "C", "D"].map((letter, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  name={`q${currentQuestion.question_id}`}
                  value={letter}
                />
                {currentQuestion[`option_${letter.toLowerCase()}`]}
              </label>
            ))}
          </div>
        )}

        {currentQuestion.question_type === "NAT" && (
          <div>
            <input
              type="text"
              placeholder="Enter your answer"
              style={{
                width: "90%",
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #dce3ec",
                fontSize: "16px",
              }}
            />
          </div>
        )}

        {/* Navigation Buttons */}
        <div>
          <button onClick={goPrev} disabled={currentQuestionIndex === 0}>
            Previous
          </button>
          <button onClick={goNext} disabled={currentQuestionIndex === filteredQuestions.length - 1}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamParts;
