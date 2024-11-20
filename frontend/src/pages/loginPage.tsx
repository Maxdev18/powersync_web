//this page will have all the login functionality
import '../styles/loginPage.css';
import { useState } from 'react';
import Input from "../components/input";
import { Link, useNavigate } from "react-router-dom";
import {OAuthProvider,Client, Account} from  'appwrite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import {UserAPI} from '../APIs/User'
import { Response } from '../Types/Response';
// import Mario from '../assets/YEE.png';
const LoginPage = () => {
    const navigate = useNavigate(); // to navigate to dashboard page if login is successful
    const client = new Client();
    client.setEndpoint('https://cloud.appwrite.io/v1').setProject('6732473100039e9e1e52');
    const account = new Account(client);
    const handleGoogleLogin = async () => {
        account.createOAuth2Session(
            OAuthProvider.Google, 
            'http://localhost:3000/dashboard',
             'http://localhost:3000/')
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const handleEmailChange = (event:any) => {
        setEmail(event.target.value);
    }
    const handlePasswordChange = (event:any) => {
        setPassword(event.target.value);
    }

    const handleLogin = async () => {
        if (email === '' || password === '') {
            alert('Please fill in all fields');
            return;
        }
        const response: Response = await UserAPI.login({email, password});
        console.log(response);
        if (response.isError) {
            setErrorMessage("Email or password is incorrect!");
        } else {
            setErrorMessage('');
            localStorage.setItem('userId', response.data.id); // store user id in local storage for easier access
            navigate('/dashboard'); // redirect to dashboard page if succeeded
        }
    }
    
    return (
        <div className="login">

            <div className='login-form'>
            <h1 className='headerTitle'>Login</h1>
        
                <div className='inputField'>    
                     <Input type="text" placeHolder="Email..." value={email} onChange={handleEmailChange} required />

                    <Input type="password" placeHolder="Password..." value={password} onChange={handlePasswordChange} required />
                    <p className='para'>Forgot your password?</p> 
                    <p  className='para' style={{ color: 'red' }}>{errorMessage}</p>
                </div>

                <div className='buttonField'>
                    <button onClick={handleLogin} className='loginBtn buttonStyle' type='submit'>Login</button>

                    <p>OR</p>

                    <button onClick={handleGoogleLogin}  className='googleBtn buttonStyle' type='submit'>
                    <FontAwesomeIcon icon={faGoogle} style={{ color: 'red', marginRight: '8px' }} />
                        Sign in with Google
                        </button>

                </div>

                <Link to="/register" className='para para2'>Don't have an account?</Link>
            </div>

            <div className='login-image'>
            </div>
        </div>
    );
}

export default LoginPage;