//this page will have all the login functionality
import '../styles/loginPage.css';
import { useState } from 'react';
import Input from "../components/input";
import { Link } from "react-router-dom";
import {OAuthProvider,Client, Account} from  'appwrite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
const LoginPage = () => {


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

    const handleEmailChange = (event:any) => {
        setEmail(event.target.value);
    }
    const handlePasswordChange = (event:any) => {
        setPassword(event.target.value);
    }
    
    return (
        <div className="login">

            <div className='login-form'>
            <h1 className='headerTitle'>Login</h1>

                <div className='inputField'>    
        
                     <Input type="text" placeHolder="Email..." value={email} onChange={handleEmailChange}/>

                    <Input type="password" placeHolder="Password..." value={password} onChange={handlePasswordChange}/>

                    <p className='para'>Forgot your password?</p> 
                </div>

                <div className='buttonField'>
                    <button className='buttonStyle' type='submit'>Login</button>

                    <p>OR</p>

                    <button onClick={handleGoogleLogin} id='google' className='buttonStyle' type='submit'>
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