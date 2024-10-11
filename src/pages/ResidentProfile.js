// src/pages/ResidentProfile.js
import React from 'react';

const ResidentProfile = () => {
  const residentInfo = {
    name: 'Resident Name',
    email: 'resident@example.com',
    cars: [
      { model: 'Toyota Camry', driver: 'Driver Name' },
      { model: 'Honda Accord', driver: 'Another Driver Name' },
    ],
  };

  return (
    <div className="container mt-4">
      <h2>Resident Profile</h2>
      <p><strong>Name:</strong> {residentInfo.name}</p>
      <p><strong>Email:</strong> {residentInfo.email}</p>
      <h4>Cars</h4>
      <ul>
        {residentInfo.cars.map((car, index) => (
          <li key={index}>{car.model} - Driven by {car.driver}</li>
        ))}
      </ul>
    </div>
  );
};

export default ResidentProfile;
