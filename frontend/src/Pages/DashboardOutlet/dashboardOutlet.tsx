import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from '../../Components/Navigation/navigation';
import './dashboardOutlet.css';

const DashboardOutlet: React.FC = () => {
  return (
    <div className="dashboard-outlet-container">
      <Navigation />

      <div className='outlet-container'>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardOutlet;
