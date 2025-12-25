import { Routes, Route } from "react-router-dom";
import Login from "./Component/login";
import StudentDashboard from "./Component/StudentDashboard";
import ExamPage from "./Component/ExamPage";

function App() {
  return (
    <Routes>
      {/* Default route → Login Page */}
      <Route path="/" element={<Login />} />

      {/* After login → Student Dashboard */}
      <Route path="/StudentDashboard" element={<StudentDashboard />} />
      <Route path="/ExamPage" element={<ExamPage />} />
    </Routes>
  );
}

export default App;
