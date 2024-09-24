
import React from 'react';
import { Link } from 'react-router-dom';

const SecuritySidebar = () => {
  return (
    <div className="col-auto px-sm-2 px-0 bg-primary">
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white">
        <a href="/" className="mt-4 d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <span className="fs-5 fw-bolder d-none d-sm-inline">Menu</span>
        </a>
        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
          <li className="nav-item">
            <Link to="/security/scan" className="nav-link align-middle px-0">
              <i className="fs-4 text-white bi-camera fw-bold"></i> <span className="ms-1  text-white d-none d-sm-inline fw-bold">License Plate Scanner</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/security/manual" className="nav-link align-middle px-0">
              <i className="fs-4 text-white bi-pencil"></i> <span className=" fw-bold ms-1 d-none d-sm-inline text-white">Manual Entry</span>
            </Link>
          </li>
          {/* Add more links as needed */}
        </ul>
      </div>
    </div>
  );
};

export default SecuritySidebar;
