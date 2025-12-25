import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Component/login";
import StudentDashboard from "./Component/StudentDashboard";
import ExamPage from "./Component/ExamPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default → Login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Student Dashboard */}
        <Route path="/dashboard" element={<StudentDashboard />} />

        {/* Exam Page */}
        <Route path="/exam" element={<ExamPage />} />

        {/* Fallback (optional but recommended) */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
