import React, { useEffect, useState } from "react";
import { API_BASE } from "../config";
import { useNavigate } from "react-router-dom";
import "./VideoLecture.css";

function VideoLecture() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

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
      <h2 className="pageTitle">My Purchased Courses</h2>

      {courses.length === 0 ? (
        <div className="emptyState">
          <p>No courses purchased yet.</p>
        </div>
      ) : (
        <div className="courseGrid">
          {courses.map((course) => (
            <div key={course.id} className="courseCard">
              <div className="courseCardContent">
                <h3>{course.name}</h3>
                <p className="courseSlug">{course.course_slug}</p>

                <button
                  className="courseBtn"
                  onClick={() => navigate(`/course/${course.course_slug}`)}
                >
                  Go To Course
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