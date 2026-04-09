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
import ComingSoon from "./Component/ComingSoon";
import ForgotPassword from "./Component/ForgotPassword";
import ResetPassword from "./Component/ResetPassword";



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
      <Route path="/test" element={<ComingSoon />} />
      <Route path="/study-material" element={<ComingSoon />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}


export default App;



