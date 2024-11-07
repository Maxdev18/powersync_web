//this page will have all the login functionality
import '../styles/loginPage.css';
const LoginPage = () => {

    return (
        <div className="login">

            <div className='login-form'>
            <h1 className='header'>Login</h1>

                <div className='inputField'>    
                    <input className='input' type="text" placeholder='Email...' />
                    <input className='input' type="password" placeholder='Password...' />
                    <p className='para'>Forgot your password?</p>
                </div>

                <div className='buttonField'>
                    <button className='buttonStyle' type='submit'>Login</button>
                    <p>OR</p>
                    <button id='google' className='buttonStyle' type='submit'>Sign in with Google</button>
                </div>

                <p className='para para2'>Don't have an account?</p>
            </div>

            <div className='login-image'>
            </div>
        </div>
    );
}

export default LoginPage;