import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet from react-router-dom
import Sidebar from '../components/SideBar';

const SecurityDashboard = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="security-content flex-grow-1">
        <Outlet /> {/* Render nested routes here */}
      </div>
    </div>
  );
};

export default SecurityDashboard;
