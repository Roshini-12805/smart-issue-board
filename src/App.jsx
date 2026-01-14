import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CreateIssue from "./pages/CreateIssue";
import IssueList from "./pages/IssueList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-issue" element={<CreateIssue />} />
      <Route path="/issues" element={<IssueList />} />
    </Routes>
  );
}

export default App;
