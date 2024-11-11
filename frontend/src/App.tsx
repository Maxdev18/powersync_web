import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardOutlet from './pages/DashboardOutlet/dashboardOutlet';
import { ProfilePage } from './pages/Profile/Profile';
import DashboardPage from './pages/Dashboard/dashboard';
import  LoginPage  from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import { VerificationPage } from './pages/Verification/verification';
const App: React.FC = () => {
  // * this is where all the routes are defined for front end 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} /> 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/code-verification" element={<VerificationPage />} />
        <Route path="/dashboard" element={<DashboardOutlet />}>
        {/*these three below are child routes of dashboard */}
          <Route path="" element={<DashboardPage />}/>
           {/* <Route path="devices" element={<Devices />}/> */}
          <Route path="profile" element={<ProfilePage />} />
        </Route>

      </Routes>
    </Router>
  )
};

export default App;