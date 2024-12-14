import { useState } from 'react';
import './profile.css'
import { VerifcationAPI } from '../../APIs/Verification';
import { useNavigate } from 'react-router-dom';
import { User } from '../../Types/User';
import { UserAPI } from '../../APIs/User';

export const ProfilePage: React.FC = () => {
    const [firstName, setFirstName] = useState<string>(JSON.parse(localStorage.getItem("user") as string).firstName)
    const [lastName, setLastName] = useState<string>(JSON.parse(localStorage.getItem("user") as string).lastName)
    const [email, setEmail] = useState<string>(JSON.parse(localStorage.getItem("user") as string).email)
    const [isDark, setIsDark] = useState<boolean>(JSON.parse(localStorage.getItem("user") as string).theme === "light" ? false : true)
    const navigate = useNavigate()

    const handleNotificationClick = () => {
        alert("Notifications clicked!");
    };

    const handleDarkModeToggle = () => {
        setIsDark(!isDark)
    }

    const handleResetPassword = async () => {
        await VerifcationAPI.getCode(JSON.parse(localStorage.getItem("user") as string).email)
        navigate("/code-verification")
    }

    const handleUpdateUser = async () => {
        const user: User = {
            email,
            firstName,
            lastName,
            theme: isDark ? "dark" : "light",
            id: JSON.parse(localStorage.getItem("user") as string)._id || JSON.parse(localStorage.getItem("user") as string).id
        }

        await UserAPI.updateUser(user)
    }

    return (
        <div className="profile-container">
        <div className="profile-header-container">
            <h1>Profile</h1>
            <div className="icons-container">
            <img className='notification-icon'
              src={require("../../assets/notification-bell.png")}
              alt="Notification icon"          
            />
            <a href="/dashboard/profile">
                <img className='profile-icon'
                src={require("../../assets/profile.png")}
                alt="Profile settings"    
                />
            </a>
            </div>
        </div>

        <div className="profile-content-container">
            <div className='profile-details-container'>
                <h2>Profile details</h2>
                <div className='profile-details-content-container'>
                    <div className='profile-image-container'>
                        <div className='profile-image'>
                            <p>{firstName[0]}</p>
                        </div>
                        <p className='profile-name'>{firstName} {lastName}</p>
                    </div>

                    <div className='profile-input-container'>
                        <p>First name</p>
                        <input
                            className='profile-input'
                            type='text'
                            placeholder='First name'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)} />
                    </div>

                    <div className='profile-input-container'>
                        <p>Last name</p>
                        <input
                            className='profile-input'
                            type='text'
                            placeholder='Last name'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)} />
                    </div>

                    <div className='profile-input-container'>
                        <p>Email</p>
                        <input
                            className='profile-input'
                            type='text'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className='profile-theme-container'>
                        <div>
                            <p>Theme</p>
                            <p>Light mode</p>
                        </div>

                        <div className='toggle-button' onClick={handleDarkModeToggle}>
                            <div className={`${isDark ? "circle-active" : "circle-not-active" } circle`}></div>
                        </div>
                    </div>

                    <div className='profile-save-btn' onClick={handleUpdateUser}>
                        <p>Save</p>
                    </div>
                </div>
            </div>

            <div className='manage-password-container'>
                <div className='manage-password-info-container'>
                    <h2>Manage password</h2>
                    <p>Request an email to retrieve reset password link</p>
                </div>

                <div className='manage-password-btn' onClick={handleResetPassword}>
                    <p>Send link</p>
                </div>
            </div>
        </div>
        </div>
    )
}