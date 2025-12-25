import { Routes, Route } from "react-router-dom";
import Login from "./Component/login";
import StudentDashboard from "./Component/StudentDashboard";
import ExamPage from "./Component/ExamPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<StudentDashboard />} />
      <Route path="/exam" element={<ExamPage />} />
    </Routes>
  );
}

export default App;



