import { useState } from 'react'
import {ToastContainer, toast} from "react-toastify"
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'
import { loginUser } from '../services/authService';
function LoginPage(){
    const navigate = useNavigate();

    // state variable to store the email and password.
    const [userData, setUserData] = useState({
        email:"",
        password:""
    });

    //state variable to show/hide the error.
    const [errors, setErrors] = useState({
        email:false,
        password:false
    })

    //state variable to disable and enable input fields
    const [loading, setLoading] = useState(false);

    //state variable to show/hide password
    const [showpassword, setShowPassword] = useState(false);

    // Method to set the input values to the state variable userData.
    const handleInput = (e) =>{
        const {name, value} = e.target;
        setUserData({...userData, [name]:value})

        //removing the error when user fills the field.
        setErrors({...errors, [name]:false})
    };

    // Method to show/hide password
    const passwordVisibility = () =>{
        setShowPassword(prev => !prev)
    }

    //Method to validate the user email and password
    const validateData = async () =>{
        const tempUserData = {
            email : userData.email.trim(),
            password: userData.password.trim()
        }
        const newErrors = {
            email: !tempUserData.email,
            password: !tempUserData.password 
        }
        setErrors(newErrors)

        if(newErrors.email && newErrors.password){
            console.log(newErrors.email)
            toast.warning("All the fields are reqired")
            return
        }
        if(newErrors.email ){
            toast.warning("please enter the email")
            return
        }
        if(newErrors.password ){
            toast.warning("please enter the password")
            return
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(tempUserData.email)) {
            toast.warning("Enter a valid email.");
            return;
        };
        
        try{
            setLoading(true)

            // Invoking the method loginUser to create the request for login
            let res = await loginUser(tempUserData, "auth/login")

            if (res && res.message === "Login Successful") {
                console.log("Success")
                localStorage.setItem("authToken", res.token);
                console.log(res.token)
                // const token = localStorage.getItem("authToken");
                // localStorage.removeItem("authToken");
                toast.success(res.message +" " + "Welcome to Task Manager");
                setTimeout(() => {
                    // window.location.href = "https://yukesh56.github.io/portfolio/";
                    navigate("/dashboard");
                }, 2000);
            }
            else{
                throw new Error("SomeThing Went Wrong. Please try again after some time")
            }
        }
        catch(err){
            toast.error(err.message || "Login failed")
        }
        finally {
            setLoading(false);
        }
    }
    return(
        <div className="parent">
            <h1 className="heading">Log In</h1>
            <input type='email' disabled={loading} className={`inputField ${errors.email ? "input-error" : ""} `} placeholder='Email' name='email' value={userData.email} onChange={handleInput}></input>
            <div className="password_container">
                <input type={showpassword ? "text" : "password"} disabled={loading} className={`inputField ${errors.password ? "input-error" : ""}`} placeholder='Password' name='password' value={userData.password} onChange={handleInput}></input>
                <img className="image" alt="eye" onClick={passwordVisibility} src={ showpassword ? "https://img.icons8.com/?size=100&id=60022&format=png&color=000000" : "https://cdn-icons-png.flaticon.com/128/709/709612.png"} />
            </div>
            <h6 className='forgot_pass'>Forgot password?</h6>
            <button className='btn' disabled={loading} onClick={validateData}>{loading ? "Logging In...." : "Log In"}</button>
            <h5 className='heading2'>Don't have an account</h5>
            <a className='anchor' onClick={() => navigate("/signin")}>Sign Up</a>
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
        </div>
    )
}

export default LoginPage