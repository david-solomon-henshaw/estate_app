import React from 'react';
import { Outlet } from 'react-router-dom';
import ResidentSidebar from '../components/ResidentSidebar';

const ResidentDashboard = () => {
  return (
    <div className="d-flex">
      <ResidentSidebar />
      <div className="resident-content flex-grow-1 p-3">
        <Outlet /> {/* Render nested routes here */}
      </div>
    </div>
  );
};

export default ResidentDashboard;
