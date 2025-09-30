import { BrowserRouter,Routes, Route } from "react-router-dom"
import LoginPage from "./pages/login"
import SignInPage from "./pages/signin";
import DashboardPage from "./pages/dashboard";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signin" element={<SignInPage />}></Route>
        <Route path="/dashboard" element={<DashboardPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
  
}

export default App
