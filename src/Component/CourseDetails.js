import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CourseDetails.css";

export default function CourseDetails() {
  const navigate = useNavigate();

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const videos = [
    {
      title: "Introduction",
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      title: "Chapter 1",
      url: "https://www.w3schools.com/html/movie.mp4",
    },
  ];

  const handleVideoSelect = (videoUrl, index) => {
    setSelectedVideo(videoUrl);
    setActiveIndex(index);
  };

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
              onClick={() => handleVideoSelect(video.url, index)}
              className={`lessonItem ${
                activeIndex === index ? "activeLesson" : ""
              }`}
            >
              {video.title}
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