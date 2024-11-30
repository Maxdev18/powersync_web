//this page will have all the login functionality
import '../styles/loginPage.css';
import { useEffect, useState } from 'react';
import Input from "../components/input";
import { Link, useNavigate } from "react-router-dom";
import {UserAPI} from '../APIs/User'
import {User} from '../Types/User'
import { Response } from '../Types/Response';
const LoginPage = () => {
    const navigate = useNavigate(); // to navigate to dashboard page if login is successful
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
    
    const handleRegister = async () => {
        if (email === '' || password === '' || firstName === '' || lastName === '') {
            alert('Please fill in all fields');
            return;
        }
        const user : User = { firstName, lastName, email, password};
        const response: Response = await UserAPI.register(user);
        console.log(response);
        if (response.isError) {
            alert(response.message);
            return;
        }
        navigate('/dashboard'); // redirect to dashboard page if succeeded
    }

    useEffect(() => {
        if(localStorage.getItem("user") !== null) {
            navigate('/dashboard')
        }
    }, [])

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
                    <button onClick={handleRegister} className='buttonStyle' type='submit'>Register</button>
                </div>

                <Link to="/login" className='para para2'>Already have an account?</Link>
            </div>

            <div id='login-image'>
            </div>
        </div>
    );
}

export default LoginPage;