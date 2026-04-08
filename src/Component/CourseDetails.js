import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CourseDetails.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function CourseDetails() {
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [videos, setVideos] = useState([]);
  const handleVideoSelect = (videoUrl, index) => {
    setSelectedVideo(videoUrl);
    setActiveIndex(index);
  };
  const { slug } = useParams();
  const [courseData, setCourseData] = useState(null);
  const API_BASE = "https://cbt-backend-production-a2f9.up.railway.app";

  useEffect(() => {
    const fetchCourse = async () => {
      const student_id = localStorage.getItem("student_id");

      const formData = new FormData();
      formData.append("student_id", student_id);

      const res = await fetch(`${API_BASE}/my-courses`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.courses.length > 0) {

        // 👉 MATCH COURSE BY SLUG
        const selected = data.courses.find(
          (c) => c.course_slug === slug
        );

        if (selected) {
          setCourseData(selected);
          setVideos(selected.videos || []);

          if (selected.videos?.length > 0) {
            setSelectedVideo(selected.videos[0].video_url);
            setActiveIndex(0);
          }
        }
      }
    };

    fetchCourse();
  }, [slug]);

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

  // return (
  //   <div className="courseWrapper">

  //     {/* 🔥 Top Navigation Buttons */}
  //     <div className="topButtons">
  //       <button className="navButton" onClick={() => navigate(-1)}>
  //         ← Back
  //       </button>

  //       <button className="navButton dashboardBtn" onClick={() => navigate("/dashboard")}>
  //         Dashboard
  //       </button>
  //     </div>

  //     <div className="courseHeader">
  //       <h2>{courseData?.name || "Loading..."}</h2>
  //       <div className="progressBar">
  //         <div className="progressFill"></div>
  //       </div>
  //     </div>

  //     <div className="courseContainer">

  //       <div className="curriculumSection">
  //         <h3>Course Content</h3>

  //         {videos.map((video, index) => (
  //           <div
  //             key={index}
  //             onClick={() => handleVideoSelect(video.video_url, index)}
  //             className={`lessonItem ${activeIndex === index ? "activeLesson" : ""
  //               }`}
  //           >
  //             {video.title || `Video ${index + 1}`}
  //           </div>
  //         ))}
  //       </div>

  //       <div className="videoSection">
  //         {selectedVideo ? (
  //           <video
  //             key={selectedVideo}
  //             controls
  //             autoPlay
  //             className="videoPlayer"
  //           >
  //             <source src={selectedVideo} type="video/mp4" />
  //           </video>
  //         ) : (
  //           <div className="placeholder">
  //             Select a lesson to start learning
  //           </div>
  //         )}
  //       </div>

  //     </div>
  //   </div>
  // );

  return (
    <div className="courseWrapper">

      {/* 🔵 TOP BAR */}
      <div className="topBar">
        <button onClick={() => navigate(-1)} className="backBtn">
          ← Back
        </button>

        <h2 className="courseTitle">
          {courseData?.name || "Loading..."}
        </h2>

        <button
          className="dashboardBtn"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </button>
      </div>

      {/* 🔵 PROGRESS */}
      <div className="progressTop">
        <div className="progressBar">
          <div
            className="progressFill"
            style={{
              width: `${videos.length
                ? Math.round(((activeIndex + 1) / videos.length) * 100)
                : 0
                }%`,
            }}
          />
        </div>

        <span className="progressText">
          {videos.length
            ? Math.round(((activeIndex + 1) / videos.length) * 100)
            : 0}
          % Complete
        </span>
      </div>

      {/* 🔵 MAIN LAYOUT */}
      <div className="courseContainer">

        {/* 📚 LEFT SIDEBAR */}
        <div className="curriculumSection">
          <h3>Course Content</h3>

          {videos.map((video, index) => (
            <div
              key={index}
              onClick={() => handleVideoSelect(video.video_url, index)}
              className={`lessonItem ${activeIndex === index ? "activeLesson" : ""
                }`}
            >
              <span className="lessonTitle">
                {video.title || `Lesson ${index + 1}`}
              </span>

              <span className="lessonMeta">
                {index < activeIndex ? "✔ Completed" : "▶ Play"}
              </span>
            </div>
          ))}
        </div>

        {/* 🎬 RIGHT VIDEO SECTION */}
        <div className="videoSection">

          {/* 🎬 PLAYER */}
          {selectedVideo ? (
            <div className="videoPlayerWrapper">
              <video
                key={selectedVideo}
                controls
                autoPlay
                className="videoPlayer"
                controlsList="nodownload noplaybackrate"
                disablePictureInPicture
              >
                <source src={selectedVideo} type="video/mp4" />
              </video>
            </div>
          ) : (
            <div className="placeholder">
              Select a lesson to start learning
            </div>
          )}

          {/* 🎯 VIDEO DETAILS */}
          {/* <div className="videoDetails">
            <h3>{videos[activeIndex]?.title}</h3>

            <p>
              Learn this topic step by step with practical examples.
            </p>

            <div className="actionBtns">
              <button className="completeBtn">
                Mark as Complete
              </button>

              <button className="downloadBtn">
                Download Notes
              </button>
            </div>
          </div> */}

        </div>

      </div>
    </div>
  );






}