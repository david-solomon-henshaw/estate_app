import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LicensePlateScanner = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [residents, setResidents] = useState([]);
  const [selectedResident, setSelectedResident] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const isIPhone = () => {
    return /iPhone/i.test(navigator.userAgent);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' }  // This requests the back camera
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError("Failed to access camera. Please ensure you've granted camera permissions.");
    }
  };

  useEffect(() => {
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
    if (isIPhone()) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (video && canvas) {
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const imageData = canvas.toDataURL('image/jpeg');
        console.log('Captured Image Data URL:', imageData);
        simulateScan();
      }
    } else {
      simulateScan();
    }
  };

  const simulateScan = () => {
    const mockPlate = 'ABC123'; // Simulated scanned license plate
    setLicensePlate(mockPlate);
    setIsLoading(true);

    // Simulate a delay to show the loading indicator
    setTimeout(() => {
      if (residents.length > 0) {
        const randomIndex = Math.floor(Math.random() * residents.length);
        const selectedResidentData = residents[randomIndex];
        setSelectedResident(selectedResidentData);
        navigate('/security/resident', { state: { resident: selectedResidentData } });
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
            <video ref={videoRef} className="w-100" autoPlay playsInline />
          </div>
          {isIPhone() && (
            <canvas ref={canvasRef} className="w-100 d-none" />
          )}
          <button className="btn btn-primary" onClick={handleScan}>
            {isLoading ? 'Scanning...' : 'Scan License Plate'}
          </button>
          {error && <p className="text-danger">{error}</p>}
        </div>
      </div>
      {/* Loading Screen */}
      {isLoading && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center" 
          style={{ 
            backgroundColor: '#007BFF',  // Bootstrap's blue color
            color: '#fff',                // White text
            zIndex: 9999 
          }}
        >
          <h1>Primewater</h1>
          <div className="spinner-border text-light mt-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default LicensePlateScanner;
