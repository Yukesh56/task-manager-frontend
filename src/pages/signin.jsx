import '../styles/signin.css'
function SignInPage(){
    return(
        <div className="parent">
            <h1 className="heading">Sign In</h1>
            <input type='text' className='inputField' placeholder='Name'></input>
            <input type='email' className='inputField' placeholder='Email'></input>
            <div className="password_container">
                <input type='password' className='inputField' placeholder='Password'></input>
                <img class="image" alt="eye" src="https://cdn-icons-png.flaticon.com/128/709/709612.png" />
            </div>
            <button className='btn'>Sign In</button>
            <h5 className='heading2'>Already have an account?</h5>
            <a className='anchor'>Log In</a>
            
        </div>
    )
}

export default SignInPage