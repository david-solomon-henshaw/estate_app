// import React, { useState, useEffect, useRef } from 'react';

// const LicensePlateScanner = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [response, setResponse] = useState(null);
//   const [error, setError] = useState('');
//   const [licensePlate, setLicensePlate] = useState('');
//   const videoRef = useRef(null);

//   useEffect(() => {
//     const startCamera = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       } catch (err) {
//         console.error('Error accessing camera:', err);
//         setError('Failed to access camera');
//       }
//     };

//     startCamera();
//   }, []);

//   const simulateApiCall = (plate) => {
//     setIsLoading(true);
//     setTimeout(() => {
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
//     }, 2000);
//   };

//   const handleScan = () => {
//     const mockPlate = 'ABC123'; // Simulated scanned license plate
//     setLicensePlate(mockPlate);
//     simulateApiCall(mockPlate);
//   };

//   return (
//     <div className="container-fluid">
//       <div className="row">
        
//         <div className="col py-3">
//           <h2>License Plate Scanner</h2>
//           <div className="camera-feed mb-3">
//             <video ref={videoRef} className="w-100" autoPlay />
//           </div>
//           <button className="btn btn-primary" onClick={handleScan}>
//             {isLoading ? 'Scanning...' : 'Scan License Plate'}
//           </button>
//           {isLoading && <p>Loading...</p>}
//           {error && <p className="text-danger">{error}</p>}
//           {response && response.status === 200 && (
//             <div className="response mt-3">
//               <h3>Scan Result</h3>
//               <p><strong>License Plate:</strong> {response.data.licensePlate}</p>
//               <p><strong>Resident Name:</strong> {response.data.residentName}</p>
//               <p><strong>Car Model:</strong> {response.data.carModel}</p>
//               <p><strong>Authorized Driver:</strong> {response.data.authorizedDriver}</p>
//               <img src={response.data.driverPicture} alt="Driver" width="100" />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LicensePlateScanner;



import React, { useState, useEffect, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LicensePlateScanner = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const videoRef = useRef(null);

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

    startCamera();
  }, []);

  const simulateApiCall = (plate) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.info(`Value returned: License Plate ${plate} scanned successfully!`);
      setError('');
    }, 2000);
  };

  const handleScan = () => {
    const mockPlate = 'ABC123'; // Simulated scanned license plate
    setLicensePlate(mockPlate);
    simulateApiCall(mockPlate);
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
