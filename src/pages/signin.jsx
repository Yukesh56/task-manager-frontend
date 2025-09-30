import { useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import '../styles/signin.css'
import { createtUser } from '../services/authService';
function SignInPage(){

    //state variable to store the userdata
    const [userData, setuserData] = useState({
        name:"",
        email:"",
        password:""
    })

    //state variable to show  and hide the errors of input fields
    const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

    // Method to assing the values to the keys of state variable userData.
    const handleInput = (e)=>{
        const {name, value} = e.target
        setuserData({...userData, [name]:value})

        // remove red border when user starts typing
        setErrors({ ...errors, [name]: false });
    };

    // Method to show/hide password
    const passwordVisibility = ()=>{
        setShowPassword(prev => !prev)
    }

    // Method to do the validation on click of signin button
    const validateData = async () => {
        console.log("Hi");
        
        const { name, email, password } = userData;

        // Temporary error object
        const newErrors = {
        name: !name.trim(),
        email: !email.trim(),
        password: !password.trim()
        };

        setErrors(newErrors);

        // If three fields are empty.
        if (newErrors.name && newErrors.email && newErrors.password) {
            toast.warning("All fields are required");
            return;
        };
        if (newErrors.name) {
            toast.warning("Name field is required");
            return;
        };
        if (newErrors.email) {
            toast.warning("Email field is required");
            return;
        };
        if (newErrors.password) {
            toast.warning("Password field is required");
            return;
        };
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.warning("Enter a valid email.");
            return;
        };
        if (password.length < 6) {
            toast.warning("Password should be at least 6 characters.");
            return;
        }
        try{
            setLoading(true)
            const payload = {
                name: userData.name.trim(),
                email: userData.email.trim(),
                password: userData.password
            };
            // Invoking the method createUser to create the request for registration.
            const res = await createtUser(payload, "auth/register");

            if (res.message === "User registered successfully") {
                console.log("Success")
                toast.success(res.message +" " + "Navigating to login page");
                setTimeout(() => {
                    navigate("/login"); // navigate after 1-1.5 sec
                }, 2000);
            };
        }
        catch(err){
            toast.error(err.message || "Registration failed")
        }
        finally {
            setLoading(false);
        }

  };
    return(
        <div className="parent">
            <h1 className="heading">Sign In</h1>
            <input type='text' disabled={loading} className={`inputField ${errors.name ? "input-error" : ""}`} placeholder='Name' value={userData.name} name='name' onChange={handleInput}></input>
            <input type='email' disabled={loading} className={`inputField ${errors.email ? "input-error" : ""}`} placeholder='Email' value={userData.email} name='email' onChange={handleInput}></input>
            <div className="password_container">
                <input type={showPassword ? "text" : "password"} disabled={loading} className={`inputField ${errors.password ? "input-error" : ""}`} placeholder='Password' value={userData.password} name='password' onChange={handleInput}></input>
                <img className="image" alt="eye" src={showPassword ? "https://img.icons8.com/?size=100&id=60022&format=png&color=000000" : "https://cdn-icons-png.flaticon.com/128/709/709612.png"} onClick={passwordVisibility}/>
            </div>
            <button className='btn_signin' onClick={validateData} disabled={loading}>{loading ? "Signing in..." : "Sign In"}</button>
            <h5 className='heading2'>Already have an account?</h5>
            <a className='anchor' onClick={() => navigate("/login")}>Log In</a>
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
            style={{ marginTop: "50px" }} // margin from top
            />
        </div>
    )
}

export default SignInPage