import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CourseDetails.css";

export default function CourseDetails() {
  const navigate = useNavigate();
  const { slug } = useParams();

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [videos, setVideos] = useState([]);
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_BASE = "https://api.geomaticsgalaxy.com";

  const isMockTest = slug === "gate-geomatics-mock-test";

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError("");

        const student_id = localStorage.getItem("student_id");

        if (!student_id) {
          navigate("/login");
          return;
        }

        const formData = new FormData();
        formData.append("student_id", student_id);

        const res = await fetch(`${API_BASE}/my-courses`, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          throw new Error("Unable to load course details.");
        }

        const data = await res.json();

        const courses = data.courses || [];
        const selected = courses.find(
          (course) => course.course_slug === slug
        );

        if (!selected) {
          setError("Course not found in your purchased courses.");
          setCourseData(null);
          setVideos([]);
          return;
        }

        setCourseData(selected);

        const courseVideos = selected.videos || [];
        setVideos(courseVideos);

        if (courseVideos.length > 0) {
          setSelectedVideo(courseVideos[0].video_url);
          setActiveIndex(0);
        } else {
          setSelectedVideo(null);
          setActiveIndex(null);
        }
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug, navigate]);

  const handleVideoSelect = (videoUrl, index) => {
    setSelectedVideo(videoUrl);
    setActiveIndex(index);
  };

  const progress =
    videos.length > 0 && activeIndex !== null
      ? Math.round(((activeIndex + 1) / videos.length) * 100)
      : 0;

  return (
    <div className="courseWrapper">
      {/* TOP BAR */}
      <div className="topBar">
        <button
          onClick={() => navigate(-1)}
          className="backBtn"
        >
          ← Back
        </button>

        <h2 className="courseTitle">
          {courseData?.name || "Course Details"}
        </h2>

        <button
          className="dashboardBtn"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </button>
      </div>

      {loading ? (
        <div className="placeholder">
          Loading course...
        </div>
      ) : error ? (
        <div className="placeholder">
          {error}
        </div>
      ) : isMockTest ? (
        /* MOCK TEST COURSE CONTENT */
        <div className="courseContainer">
          <div className="curriculumSection">
            <h3>GATE Geomatics Mock Test</h3>

            <p>
              Practice your preparation with our online mock test series.
            </p>

            <button
              className="dashboardBtn"
              onClick={() => navigate("/test")}
            >
              Go to Mock Tests →
            </button>
          </div>

          <div className="videoSection">
            <div className="placeholder">
              <h3>Mock Test Series</h3>
              <p>
                Open the test section to view your available tests.
              </p>

              <button
                className="dashboardBtn"
                onClick={() => navigate("/test")}
              >
                View Available Tests
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* NORMAL COURSE VIDEO CONTENT */
        <>
          <div className="progressTop">
            <div className="progressBar">
              <div
                className="progressFill"
                style={{ width: `${progress}%` }}
              />
            </div>

            <span className="progressText">
              {progress}% Complete
            </span>
          </div>

          <div className="courseContainer">
            <div className="curriculumSection">
              <h3>Course Content</h3>

              {videos.length > 0 ? (
                videos.map((video, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      handleVideoSelect(video.video_url, index)
                    }
                    className={`lessonItem ${
                      activeIndex === index ? "activeLesson" : ""
                    }`}
                  >
                    <span className="lessonTitle">
                      {video.title || `Lesson ${index + 1}`}
                    </span>

                    <span className="lessonMeta">
                      ▶ Play
                    </span>
                  </div>
                ))
              ) : (
                <p>No video lessons available.</p>
              )}
            </div>

            <div className="videoSection">
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
                    <source
                      src={selectedVideo}
                      type="video/mp4"
                    />
                    Your browser does not support video playback.
                  </video>
                </div>
              ) : (
                <div className="placeholder">
                  Select a lesson to start learning.
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
