import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LicensePlateScanner = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [residents, setResidents] = useState([]);
  const [selectedResident, setSelectedResident] = useState(null); // This initializes the state
  const videoRef = useRef(null);
  const navigate = useNavigate(); // Get the navigate function from useNavigate


  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
        setError('Failed to access camera');
      }
    };

    const fetchResidents = async () => {
      try {
        const response = await fetch('https://flask-backend-estate.onrender.com/api/residents');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setResidents(data);
      } catch (error) {
        console.error('Error fetching residents:', error);
        setError('Failed to fetch residents');
      }
    };

    startCamera();
    fetchResidents();
  }, []);

  const handleScan = () => {
    const mockPlate = 'ABC123'; // Simulated scanned license plate
    setLicensePlate(mockPlate);
    setIsLoading(true);
  
    // Simulate a delay to show the loading indicator
    setTimeout(() => {
      if (residents.length > 0) {
        const randomIndex = Math.floor(Math.random() * residents.length);
        const selectedResidentData = residents[randomIndex]; // Set the resident here
        setSelectedResident(selectedResidentData); // Set the state correctly
  
        // Navigate to the ResidentCard page with resident details as state
        console.log(residents);
        console.log(selectedResidentData);
        navigate('/security/resident', { state: { resident: selectedResidentData } }); // Pass the resident here
      }
      setIsLoading(false);
      setError('');
    }, 2000);
  };
  
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col py-3">
          <h2>License Plate Scanner</h2>
          <div className="camera-feed mb-3">
            <video ref={videoRef} className="w-100" autoPlay />
          </div>
          <button className="btn btn-primary" onClick={handleScan}>
            {isLoading ? 'Scanning...' : 'Scan License Plate'}
          </button>
          {error && <p className="text-danger">{error}</p>}

        </div>
      </div>
      {isLoading && (
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', zIndex: 9999 }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default LicensePlateScanner;