import { BrowserRouter,Routes, Route } from "react-router-dom"
import LoginPage from "./pages/login"
import SignInPage from "./pages/signin";
import DashboardPage from "./pages/dashboard";
import ProjectDetail from "./components/ProjectDetail"
import CreateTaskForm from "./components/CreateTaskForm"
function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signin" element={<SignInPage />}></Route>
        <Route path="/dashboard" element={<DashboardPage />}></Route>
        <Route path="/project/:projectId" element={<ProjectDetail />}></Route>
        <Route path="/createtask" element={<CreateTaskForm />}></Route>
      </Routes>
    </BrowserRouter>
  );
  
}

export default App
