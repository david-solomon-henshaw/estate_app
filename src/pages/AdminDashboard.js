import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet from react-router-dom
import AdminSidebar from '../components/AdminSideBar';

const AdminDashboard = () => {
  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="admin-content flex-grow-1">
        <Outlet /> {/* Render nested routes here */}
      </div>
    </div>
  );
};

export default AdminDashboard;
