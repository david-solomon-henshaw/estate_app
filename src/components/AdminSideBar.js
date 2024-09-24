
import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className="col-auto  px-sm-2 px-0 bg-primary">
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white">
        <a href="/" className=" mt-4 d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <span className="fs-5 fw-bolder d-none d-sm-inline">Menu</span>
        </a>
        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
          <li className="nav-item">
            <Link to="/admin/residents" className="nav-link align-middle px-0">
              <i className="fs-4 bi-house text-light fw-bold"></i> <span className="fw-bold text-light ms-1 d-none d-sm-inline">Manage Residents</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/cars" className="nav-link align-middle px-0">
              <i className="fs-4 bi-table text-light"></i> <span className="fw-bold ms-1 d-none d-sm-inline text-light">Manage Cars</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/drivers" className="nav-link align-middle px-0">
              <i className="fs-4 bi-people text-light"></i> <span className="fw-bold text-light ms-1 d-none d-sm-inline">Manage Drivers</span>
            </Link>
          </li>
        </ul>
        
      </div>
    </div>
  );
};

export default AdminSidebar;
