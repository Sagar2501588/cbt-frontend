import { Routes, Route } from "react-router-dom";
import Login from "./Component/login";
import StudentDashboard from "./Component/StudentDashboard";
import ExamPage from "./Component/ExamPage";
import ResultPage from "./Component/ResultPage";
import "katex/dist/katex.min.css";
import PortalHome from "./Component/PortalHome";
import CourseDetails from "./Component/CourseDetails";
import VideoLecture from "./Component/VideoLecture";
import PaymentPage from "./Component/PaymentPage";



function App() {
  return (
    <Routes>
      <Route path="/" element={<PortalHome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<StudentDashboard />} />
      <Route path="/exam/:examId" element={<ExamPage />} />
      <Route path="/result" element={<ResultPage />} />
      {/* <Route path="/course/:id" element={<CourseDetails />} /> */}
      <Route path="/course/:slug" element={<CourseDetails />} />
      <Route path="/video-lecture" element={<VideoLecture />} />
      <Route path="/payment/:slug" element={<PaymentPage />} />
      {/* <Route path="/test" element={<Test />} />
      <Route path="/result" element={<Result />} />
      <Route path="/study-material" element={<StudyMaterial />} /> */}
    </Routes>
  );
}


export default App;



