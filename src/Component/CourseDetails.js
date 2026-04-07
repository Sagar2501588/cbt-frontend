import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CourseDetails.css";
import { useEffect } from "react";

export default function CourseDetails() {
  const navigate = useNavigate();

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [videos, setVideos] = useState([]);

  const handleVideoSelect = (videoUrl, index) => {
    setSelectedVideo(videoUrl);
    setActiveIndex(index);
  };

  useEffect(() => {
    const fetchCourse = async () => {
      const student_id = localStorage.getItem("student_id");

      const formData = new FormData();
      formData.append("student_id", student_id);

      const res = await fetch(
        "https://cbt-backend-production-a2f9.up.railway.app/my-courses",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.courses.length > 0) {
        const course = data.courses[0];
        setVideos(course.videos || []);

        if (course.videos && course.videos.length > 0) {
          setSelectedVideo(course.videos[0].video_url);
          setActiveIndex(0);
        }
      }
    };

    fetchCourse();
  }, []);

  return (
    <div className="courseWrapper">

      {/* 🔥 Top Navigation Buttons */}
      <div className="topButtons">
        <button className="navButton" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <button className="navButton dashboardBtn" onClick={() => navigate("/dashboard")}>
          Dashboard
        </button>
      </div>

      <div className="courseHeader">
        <h2>Batch SANKALP (B1)</h2>
        <div className="progressBar">
          <div className="progressFill"></div>
        </div>
      </div>

      <div className="courseContainer">

        <div className="curriculumSection">
          <h3>Course Content</h3>

          {videos.map((video, index) => (
            <div
              key={index}
              onClick={() => handleVideoSelect(video.video_url, index)}
              className={`lessonItem ${activeIndex === index ? "activeLesson" : ""
                }`}
            >
              {video.title || `Video ${index + 1}`}
            </div>
          ))}
        </div>

        <div className="videoSection">
          {selectedVideo ? (
            <video
              key={selectedVideo}
              controls
              autoPlay
              className="videoPlayer"
            >
              <source src={selectedVideo} type="video/mp4" />
            </video>
          ) : (
            <div className="placeholder">
              Select a lesson to start learning
            </div>
          )}
        </div>

      </div>
    </div>
  );
}