import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaBuilding, FaMapMarkerAlt, FaLevelUpAlt, FaPhone } from 'react-icons/fa';

const ResidentCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const resident = location.state?.resident; // Access the resident from the location state

  console.log(resident, "resident data"); // Log the resident data to debug

  // If no resident data, redirect back to the scanner
  if (!resident) {
    navigate('/security/scan');
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="card animate__animated animate__fadeInUp m-4" style={{ width: '20rem' }}>
      <img src={resident.imageUrl} className="card-img-top" alt={resident.name} />
      <div className="card-body d-grid gap-2"> {/* Add d-grid and gap-2 classes */}
        <h5 className="card-title">Resident Details</h5>
        <div className="row text-muted"> {/* Wrap each detail in a row */}
          <div className="col">
            <strong>Name:</strong> {resident.name}
          </div>
          <div className="col">
            <FaHome className="me-2" />
            <strong>House:</strong> {resident.houseName}
          </div>
        </div>
        <div className="row text-muted">
          <div className="col">
            <FaBuilding className="me-2" />
            <strong>Flat:</strong> {resident.flatNumber}
          </div>
          <div className="col">
            <FaLevelUpAlt className="me-2" />
            <strong>Floor:</strong> {resident.floorNumber}
          </div>
        </div>
        <div className="row text-muted">
        
          <div className="col">
            <FaPhone className="me-2" />
            <strong>Phone:</strong> {resident.phoneNumber}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidentCard;