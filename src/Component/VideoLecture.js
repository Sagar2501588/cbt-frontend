// import React, { useEffect, useState } from "react";
// import { API_BASE } from "../config";
// import { useNavigate } from "react-router-dom";

// function VideoLecture() {
//   const [courses, setCourses] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function loadCourses() {
//       const studentId = localStorage.getItem("student_id");

//       if (!studentId) return;

//       const res = await fetch(`${API_BASE}/my-courses`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: new URLSearchParams({
//           student_id: studentId,
//         }),
//       });

//       const data = await res.json();
//       console.log("My Courses:", data); // 🔥 debug line
//       setCourses(data.courses || []);
//     }

//     loadCourses();
//   }, []);

//   return (
//     <div style={{ padding: "30px" }}>
//       <h2>My Purchased Courses</h2>

//       {courses.length === 0 ? (
//         <p>No courses purchased yet.</p>
//       ) : (
//         <div style={{ display: "grid", gap: "20px", marginTop: "20px" }}>
//           {courses.map((course) => (
//             <div
//               key={course.id}
//               style={{
//                 padding: "20px",
//                 background: "white",
//                 borderRadius: "8px",
//                 boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//               }}
//             >
//               <h3>{course.name}</h3>   {/* ✅ fixed */}
//               <p>Course Slug: {course.course_slug}</p>

//               <button
//                 style={{
//                   padding: "8px 15px",
//                   background: "#007bff",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "5px",
//                 }}
//                 onClick={() => navigate(`/course/${course.course_slug}`)}
//               >
//                 Course Details
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default VideoLecture;


import React, { useEffect, useState } from "react";
import { API_BASE } from "../config";
import { useNavigate } from "react-router-dom";
import "./VideoLecture.css";

function VideoLecture() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadCourses() {
      const studentId = localStorage.getItem("student_id");
      if (!studentId) return;

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
      setCourses(data.courses || []);
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