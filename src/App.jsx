import { BrowserRouter,Routes, Route } from "react-router-dom"
import LoginPage from "./components/login"
import SignInPage from "./components/signin";
import DashboardPage from "./components/dashboard";
import ProjectDetail from "./components/ProjectDetail"
import CreateTaskForm from "./components/CreateTaskForm"
import { ToastContainer } from "react-toastify";
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

      <ToastContainer
        position="top-right"    
        autoClose={3000}        
        hideProgressBar={true}  
        newestOnTop={false}  
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        pauseOnFocusLoss
        style={{ marginTop: "50px" }}
      />
    </BrowserRouter>
  );
  
}

export default App
