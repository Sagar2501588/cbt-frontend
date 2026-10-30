
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Test.css";

const API_URL = "http://127.0.0.1:8000";

function Test() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function loadTests() {
      try {
        const studentId = localStorage.getItem("student_id");

        if (!studentId) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          `${API_URL}/my-mock-tests`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
              student_id: studentId
            })
          }
        );

        if (!response.ok) {
          throw new Error("Unable to load mock tests");
        }

        const data = await response.json();
        setTests(data.tests || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadTests();
  }, [navigate]);

  // return (
  //   <div style={{ padding: "40px", maxWidth: "1000px", margin: "auto" }}>
  //     <h2>GATE Geomatics Mock Test Series</h2>
  //     <p>Select a test to start your examination.</p>

  //     {loading && <p>Loading tests...</p>}

  //     {error && <p style={{ color: "red" }}>{error}</p>}

  //     {!loading && !error && tests.length === 0 && (
  //       <p>No tests available. Please purchase the Mock Test Series.</p>
  //     )}

  //     {tests.map((test) => (
  //       <div
  //         key={test.exam_id}
  //         style={{
  //           padding: "20px",
  //           marginBottom: "15px",
  //           border: "1px solid #ddd",
  //           borderRadius: "10px",
  //           display: "flex",
  //           justifyContent: "space-between",
  //           alignItems: "center"
  //         }}
  //       >
  //         <div>
  //           <h3>{test.title}</h3>
  //           <p>{test.total_questions} Questions</p>
  //         </div>

  //         <button
  //           onClick={() => navigate(`/exam/${test.exam_id}`)}
  //         >
  //           Start Test
  //         </button>
  //       </div>
  //     ))}
  //   </div>
  // );

return (
  <div className="test-page">
    <div className="test-container">
      <header className="test-header">
        <h1>GATE Geomatics Mock Test Series</h1>
        <p>Select a test to start your examination.</p>
      </header>

      {loading && (
        <div className="test-message">
          Loading tests...
        </div>
      )}

      {error && (
        <div className="test-message error">
          {error}
        </div>
      )}

      {!loading && !error && tests.length === 0 && (
        <div className="test-message">
          No tests available. Please purchase the Mock Test Series.
        </div>
      )}

      {!loading && !error && tests.length > 0 && (
        <div className="test-grid">
          {tests.map((test) => (
            <article className="test-card" key={test.exam_id}>
              <h3>{test.title}</h3>

              <p>
                {test.total_questions} Questions
              </p>

              <button
                className="test-start-btn"
                onClick={() =>
  navigate(`/exam-start-guide/${test.exam_id}`)
}
              >
                Start Test
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  </div>
);


}

export default Test;
