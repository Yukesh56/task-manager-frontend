import '../styles/login.css'
function LoginPage(){
    return(
        <div className="parent">
            <h1 className="heading">Log In</h1>
            <input type='email' className='inputField' placeholder='Email'></input>
            <div className="password_container">
                <input type='password' className='inputField' placeholder='Password'></input>
                <img className="image" alt="eye" src="https://cdn-icons-png.flaticon.com/128/709/709612.png" />
            </div>
            <h6 className='forgot_pass'>Forgot password?</h6>
            <button className='btn'>Log In</button>
            <h5 className='heading2'>Don't have an account</h5>
            <a className='anchor'>Sign Up</a>
            
        </div>
    )
}

export default LoginPage