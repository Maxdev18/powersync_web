import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardOutlet from './pages/DashboardOutlet/dashboardOutlet';
import { ProfilePage } from './pages/Profile/Profile';
import { DashboardPage } from './pages/Dashboard/dashboard';
import  LoginPage  from './pages/loginPage';
import RegisterPage from './pages/registerPage';
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardOutlet />}>
          <Route path="" element={<DashboardPage />}/>
          {/* {/* <Route path="devices" element={<Devices />}/> */}
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  )
};

export default App;