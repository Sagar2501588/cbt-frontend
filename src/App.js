import { Routes, Route } from "react-router-dom";
import Login from "./Component/login";
import StudentDashboard from "./Component/StudentDashboard";
import ExamPage from "./Component/ExamPage";
import ResultPage from "./Component/ResultPage";
import "katex/dist/katex.min.css";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<StudentDashboard />} />
      <Route path="/exam/:examId" element={<ExamPage />} />
      <Route path="/result" element={<ResultPage />} />
    </Routes>
  );
}

export default App;



