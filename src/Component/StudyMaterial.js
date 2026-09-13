// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function StudyMaterial() {
//   const [pdfs, setPdfs] = useState([]);

//   useEffect(() => {
//     loadPdfs();
//   }, []);

//   const loadPdfs = async () => {
//     try {
//       const studentId = localStorage.getItem("student_id");

//       const formData = new FormData();
//       formData.append("student_id", studentId);

//       const res = await axios.post(
//         "https://cbt-backend-production-a2f9.up.railway.app/my-courses",
//         formData
//       );

//       let allPdfs = [];

//       res.data.courses.forEach(course => {
//         if (course.pdfs) {
//           allPdfs.push(...course.pdfs);
//         }
//       });

//       setPdfs(allPdfs);

//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2>Study Materials</h2>

//       {pdfs.map(pdf => (
//         <div
//           key={pdf.id}
//           style={{
//             padding: "15px",
//             marginBottom: "10px",
//             border: "1px solid #ddd",
//             borderRadius: "10px"
//           }}
//         >
//           <h4>{pdf.title}</h4>

//           <a
//             href={pdf.pdf_url}
//             target="_blank"
//             rel="noreferrer"
//           >
//             Open PDF
//           </a>
//         </div>
//       ))}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import sankalpB1 from "../assets/Sankalp B1.jpeg";
import sankalpB2 from "../assets/Sankalp B2.jpeg";
import prithvi from "../assets/PRITHVI.jpeg";
import dishantar from "../assets/DISHANTAR.jpeg";
import pratibimb from "../assets/PRATIBIMB.jpeg";
import gati from "../assets/gati.jpeg";
import free from "../assets/free.jpeg";

export default function StudyMaterial() {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    const courseImages = {
        "sankalp-b1": sankalpB1,
        "sankalp-b2": sankalpB2,
        "prithvi": prithvi,
        "dishantar": dishantar,
        "pratibimb": pratibimb,
        "free-content": free,
        "gati-crash-course": gati,
    };

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {
        try {
            const studentId = localStorage.getItem("student_id");

            const formData = new FormData();
            formData.append("student_id", studentId);

            const res = await axios.post(
                "https://cbt-backend-production-a2f9.up.railway.app/my-courses",
                formData
            );

            setCourses(res.data.courses || []);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="videoLectureWrapper">

            {/* Top Header */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >
                <h2 className="pageTitle">Study Materials</h2>

                <button
                    onClick={() => navigate("/dashboard")}
                    style={{
                        background: "linear-gradient(90deg,#8b5cf6,#38bdf8)",
                        color: "#fff",
                        border: "none",
                        padding: "10px 18px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontWeight: "600",
                    }}
                >
                    ← Back to Dashboard
                </button>
            </div>

            <div className="courseGrid centered">
                {courses.map((course) => (
                    <div key={course.id} className="courseCard">

                        <div className="courseImageWrapper">
                            <img
                                src={
                                    courseImages[course.course_slug] ||
                                    "https://picsum.photos/400/200"
                                }
                                alt={course.name}
                                className="courseImage"
                            />
                        </div>

                        <div className="courseContent">
                            <h3>{course.name}</h3>

                            <p className="courseSub">
                                {course.pdfs?.length || 0} PDF Materials
                            </p>

                            <button
                                className="courseBtn"
                                onClick={() =>
                                    navigate(`/study-material/${course.course_slug}`)
                                }
                            >
                                View Materials
                            </button>

                        </div>

                    </div>
                ))}
            </div>

        </div>
    );
}