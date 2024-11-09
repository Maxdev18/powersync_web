import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardOutlet from './Pages/DashboardOutlet/dashboardOutlet';
import { ProfilePage } from './Pages/Profile/Profile';
import { DashboardPage } from './Pages/Dashboard/dashboard';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}
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