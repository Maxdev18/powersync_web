import { useState } from 'react';
import './profile.css'

export const ProfilePage: React.FC = () => {
    const [isDark, setIsDark] = useState<boolean>(false)

    const handleNotificationClick = () => {
        alert("Notifications clicked!");
    };

    const handleDarkModeToggle = () => {
        setIsDark(!isDark)
    }

    const handleResetPassword = () => {

    }

    return (
        <div className="profile-container">
        <div className="profile-header-container">
            <h1>Profile</h1>
            <div className="icons-container">
            <img
                src={require("../../assets/notification-bell.png")}
                alt="Notification icon"
                onClick={handleNotificationClick} />

            <a href="/dashboard/profile">
                <img
                    src={require("../../assets/profile.png")}
                    alt="Profile settings" />
            </a>
            </div>
        </div>

        <div className="profile-content-container">
            <div className='profile-details-container'>
                <h2>Profile details</h2>
                <div className='profile-details-content-container'>
                    <div className='profile-image-container'>
                        <div className='profile-image'>
                            <p>M</p>
                        </div>
                        <p className='profile-name'>Max Melnik</p>
                    </div>

                    <div className='profile-input-container'>
                        <p>Name</p>
                        <input className='profile-input' type='text' placeholder='Name' value="Max Melnik" />
                    </div>

                    <div className='profile-input-container'>
                        <p>Email</p>
                        <input className='profile-input' type='text' placeholder='Email' value="mzm6958@psu.edu" />
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

                    <div className='profile-save-btn'>
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
                    <p>Save</p>
                </div>
            </div>
        </div>
        </div>
    )
}