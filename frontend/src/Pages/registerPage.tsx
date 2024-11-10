//this page will have all the login functionality
import '../styles/loginPage.css';
import { useState } from 'react';
import Input from "../components/input";
import { Link } from "react-router-dom";
const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName , setFirstName] = useState('');
    const [lastName , setLastName] = useState('');
    const handleEmailChange = (event:any) => {
        setEmail(event.target.value);
    }
    const handlePasswordChange = (event:any) => {
        setPassword(event.target.value);
    }
    const handleFirstNameChange = (event:any) => {
        setFirstName(event.target.value);
    }
    
    const handleLastNameChange = (event:any) => {
        setLastName(event.target.value);
    }
    
    return (
        <div className="login">

            <div className='login-form'>
            <h1 className='headerTitle'>Register</h1>

                <div className='inputField'>  

                    <Input type="text" placeHolder="First name..." value={firstName} onChange=      {handleFirstNameChange}/>  

                    <Input type="text" placeHolder="Last name..." value={lastName} onChange={handleLastNameChange}/>
        
                    <Input type="text" placeHolder="Email..." value={email} onChange={handleEmailChange}/>

                    <Input type="password" placeHolder="Password..." value={password} onChange={handlePasswordChange}/>

                </div>

                <div className='buttonField'>
                    <button className='buttonStyle' type='submit'>Register</button>
                </div>

                <Link to="/login" className='para para2'>Already have an account?</Link>
            </div>

            <div id='login-image'>
            </div>
        </div>
    );
}

export default LoginPage;