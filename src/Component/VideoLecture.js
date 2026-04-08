import React, { useEffect, useState } from "react";
import { API_BASE } from "../config";
import { useNavigate } from "react-router-dom";
import "./VideoLecture.css";

import sankalpB1 from "../assets/Sankalp B1.jpeg";
import sankalpB2 from "../assets/Sankalp B2.jpeg";
import prithvi from "../assets/PRITHVI.jpeg";
import dishantar from "../assets/DISHANTAR.jpeg";
import pratibimb from "../assets/PRATIBIMB.jpeg";



function VideoLecture() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState("");

  const courseImages = {
    "sankalp-b1": sankalpB1,
    "sankalp-b2": sankalpB2,
    "prithvi": prithvi,
    "dishantar": dishantar,
    "pratibimb": pratibimb,
  };

  useEffect(() => {
    const name = localStorage.getItem("student_name");
    setStudentName(name || "Student");
  }, []);

  useEffect(() => {
    async function loadCourses() {
      try {
        const studentId = localStorage.getItem("student_id");
        console.log("Student ID:", studentId);

        if (!studentId) {
          console.log("No student ID found");
          return;
        }

        const res = await fetch(`${API_BASE}/my-courses`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            student_id: studentId,
          }),
        });

        const data = await res.json();
        console.log("API Response:", data);
        console.log("Courses:", data);

        setCourses(data.courses || []);
      } catch (error) {
        console.error("Error loading courses:", error);
      }
    }

    loadCourses();
  }, []);


  return (
    <div className="videoLectureWrapper">

      {/* NAVBAR */}
      <div className="topNavbar">
        <div className="navLeft">
          <div className="logoBox">G</div>
          <span className="brandName">Geomatics Galaxy</span>
        </div>

        <div className="navRight">

          <div className="profileMini">
            <div className="avatarCircle">
              {studentName ? studentName.charAt(0).toUpperCase() : "S"}
            </div>
            <span className="userName">{studentName}</span>
          </div>
        </div>
      </div>

      <h2 className="pageTitle">My Purchased Courses</h2>

      {courses.length === 0 ? (
        <div className="emptyState">
          <p>No courses purchased yet.</p>
        </div>
      ) : (
        <div className="courseGrid centered">
          {courses.map((course) => (
            <div key={course.id} className="courseCard">

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

              <div className="courseContent">
                <h3>{course.name}</h3>
                <p className="courseSub">{course.course_slug}</p>

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
          ))}
        </div>
      )}
    </div>
  );


}

export default VideoLecture;