

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ManualEntry = () => {
  const [licensePlate, setLicensePlate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [residents, setResidents] = useState([]); // Store fetched residents
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use navigate to route programmatically

  useEffect(() => {
    // Fetch residents on component mount
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

    fetchResidents();
  }, []);

  const simulateApiCall = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (residents.length > 0) {
        const randomIndex = Math.floor(Math.random() * residents.length);
        const randomResident = residents[randomIndex]; // Select random resident
        
        // Navigate to the ResidentCard page with resident details
        navigate('/security/resident', { state: { resident: randomResident } });
      } else {
        setError('No residents found');
      }
      setIsLoading(false);
    }, 2000); // Simulate 2-second delay
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!licensePlate) {
      setError('License plate is required');
      return;
    }
    setError('');
    simulateApiCall();
  };

  return (
    <div className="manual-entry container mt-4">
      <h2 className="mb-3">Manual License Plate Entry</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="licensePlate" className="form-label">License Plate:</label>
          <input 
            type="text" 
            id="licensePlate" 
            className="form-control" 
            value={licensePlate} 
            onChange={(e) => setLicensePlate(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
        {error && <p className="text-danger">{error}</p>}
      </form>

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
    </div>
  );
};

export default ManualEntry;
