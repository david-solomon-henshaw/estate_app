import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaPlusCircle, FaHistory, FaCar, FaUserTie } from 'react-icons/fa';

const ResidentSidebar = () => {
  return (
    <div className="col-auto px-sm-2 px-0 bg-primary">
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white">
        <a href="/" className="mt-4 d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <span className="fs-5 fw-bolder d-none d-sm-inline">Resident Menu</span>
        </a>
        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
          <li className="nav-item">
            <Link to="/resident/add-visitor" className="nav-link align-middle px-0">
              <FaPlusCircle className="fs-4 text-white" /> 
              <span className="ms-1 text-white d-none d-sm-inline fw-bold">Add Visitor</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/resident/visitor-history" className="nav-link align-middle px-0">
              <FaHistory className="fs-4 text-white" /> 
              <span className="ms-1 text-white d-none d-sm-inline fw-bold">Visitor History</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/resident/profile" className="nav-link align-middle px-0">
              <FaUser className="fs-4 text-white" /> 
              <span className="ms-1 text-white d-none d-sm-inline fw-bold">Resident Profile</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/resident/cars" className="nav-link align-middle px-0">
              <FaCar className="fs-4 text-white" /> 
              <span className="ms-1 text-white d-none d-sm-inline fw-bold">Manage Cars</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/resident/drivers" className="nav-link align-middle px-0">
              <FaUserTie className="fs-4 text-white" /> 
              <span className="ms-1 text-white d-none d-sm-inline fw-bold">Assigned Drivers</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ResidentSidebar;
