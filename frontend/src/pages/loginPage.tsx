//this page will have all the login functionality
import '../styles/loginPage.css';
import { useState } from 'react';
import Input from "../components/input";
// import Button from "../components/button";
const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event:any) => {
        setEmail(event.target.value);
    }
    const handlePasswordChange = (event:any) => {
        setPassword(event.target.value);
    }
    

    return (
        <div className="login">

            <div className='login-form'>
            <h1 className='header'>Login</h1>

                <div className='inputField'>    
        
                     <Input type="text" placeHolder="Email..." value={email} onChange={handleEmailChange}/>

                    <Input type="password" placeHolder="Password..." value={password} onChange={handlePasswordChange}/>

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