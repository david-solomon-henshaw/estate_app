// import React, { useState } from 'react';

// const ManualEntry = () => {
//   const [licensePlate, setLicensePlate] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [response, setResponse] = useState(null);
//   const [error, setError] = useState('');

//   const simulateApiCall = (plate) => {
//     setIsLoading(true);
//     setTimeout(() => {
//       // Simulate a successful API response
//       setIsLoading(false);
//       setResponse({
//         status: 200,
//         data: {
//           licensePlate: plate,
//           residentName: 'John Doe',
//           carModel: 'Toyota Camry',
//           authorizedDriver: 'Jane Smith',
//           driverPicture: 'https://example.com/driver.jpg'
//         }
//       });
//       setError('');
//     }, 2000); // Simulate 2-second delay
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!licensePlate) {
//       setError('License plate is required');
//       return;
//     }
//     setError('');
//     simulateApiCall(licensePlate);
//   };

//   return (
//     <div className="manual-entry">
//       <h2>Manual License Plate Entry</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="licensePlate">License Plate:</label>
//           <input 
//             type="text" 
//             id="licensePlate" 
//             value={licensePlate} 
//             onChange={(e) => setLicensePlate(e.target.value)} 
//             required 
//           />
//         </div>
//         <button type="submit">
//           {isLoading ? 'Submitting...' : 'Submit'}
//         </button>
//         {isLoading && <p>Loading...</p>}
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//       </form>
//       {response && response.status === 200 && (
//         <div className="response">
//           <h3>Submission Result</h3>
//           <p><strong>License Plate:</strong> {response.data.licensePlate}</p>
//           <p><strong>Resident Name:</strong> {response.data.residentName}</p>
//           <p><strong>Car Model:</strong> {response.data.carModel}</p>
//           <p><strong>Authorized Driver:</strong> {response.data.authorizedDriver}</p>
//           <img src={response.data.driverPicture} alt="Driver" width="100" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManualEntry;


import React, { useState } from 'react';

const ManualEntry = () => {
  const [licensePlate, setLicensePlate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  const simulateApiCall = (plate) => {
    setIsLoading(true);
    setTimeout(() => {
      // Simulate a successful API response
      setIsLoading(false);
      setResponse({
        status: 200,
        data: {
          licensePlate: plate,
          residentName: 'John Doe',
          carModel: 'Toyota Camry',
          authorizedDriver: 'Jane Smith',
          driverPicture: 'https://example.com/driver.jpg'
        }
      });
      setError('');
    }, 2000); // Simulate 2-second delay
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!licensePlate) {
      setError('License plate is required');
      return;
    }
    setError('');
    simulateApiCall(licensePlate);
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
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-danger">{error}</p>}
      </form>
      {response && response.status === 200 && (
        <div className="response border p-3 rounded">
          <h3>Submission Result</h3>
          <p><strong>License Plate:</strong> {response.data.licensePlate}</p>
          <p><strong>Resident Name:</strong> {response.data.residentName}</p>
          <p><strong>Car Model:</strong> {response.data.carModel}</p>
          <p><strong>Authorized Driver:</strong> {response.data.authorizedDriver}</p>
          <img src={response.data.driverPicture} alt="Driver" className="img-fluid" width="100" />
        </div>
      )}
    </div>
  );
};

export default ManualEntry;
