import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function CourseMaterials() {
  const { courseSlug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourseMaterials();
  }, []);

  const loadCourseMaterials = async () => {
    try {
      const studentId = localStorage.getItem("student_id");

      const formData = new FormData();
      formData.append("student_id", studentId);

      const res = await axios.post(
        "https://cbt-backend-production-a2f9.up.railway.app/my-courses",
        formData
      );

      const selectedCourse = res.data.courses.find(
        (c) => c.course_slug === courseSlug
      );

      setCourse(selectedCourse);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          background: "#020b2d",
          minHeight: "100vh",
          color: "#fff",
          padding: "40px",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!course) {
    return (
      <div
        style={{
          background: "#020b2d",
          minHeight: "100vh",
          color: "#fff",
          padding: "40px",
        }}
      >
        Course not found
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#020b2d",
        minHeight: "100vh",
        padding: "40px",
        color: "#fff",
      }}
    >
      <Link
        to="/study-material"
        style={{
          color: "#7dd3fc",
          textDecoration: "none",
          fontWeight: "600",
        }}
      >
        ← Back
      </Link>

      <h1 style={{ marginTop: "20px" }}>
        {course.name} Study Materials
      </h1>

      <div
        style={{
          display: "grid",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {course.pdfs && course.pdfs.length > 0 ? (
          course.pdfs.map((pdf) => (
            <div
              key={pdf.id}
              style={{
                background: "#071338",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "16px",
                padding: "20px",
              }}
            >
              <h3>{pdf.title}</h3>

              <a
                href={pdf.pdf_url}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: "15px",
                  padding: "12px 24px",
                  borderRadius: "10px",
                  background:
                    "linear-gradient(90deg,#a78bfa,#38bdf8)",
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: "600",
                }}
              >
                Open PDF
              </a>
            </div>
          ))
        ) : (
          <div>No PDFs Available</div>
        )}
      </div>
    </div>
  );
}