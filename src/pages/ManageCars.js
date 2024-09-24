





import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCarForm = () => {
  const [licensePlate, setLicensePlate] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [residentId, setResidentId] = useState('');
  const [residents, setResidents] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const response = await fetch('https://flask-backend-estate.onrender.com/api/residents');
        if (!response.ok) {
          throw new Error('Failed to fetch residents');
        }
        const data = await response.json();
        setResidents(data);
        const uniqueBuildings = [...new Set(data.map(resident => resident.houseName))];
        setBuildings(uniqueBuildings);
      } catch (err) {
        setError('Failed to fetch residents');
        console.error(err);
        toast.error('Failed to fetch residents');
      }
    };

    fetchResidents();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    let imageUrl = '';
    if (image) {
      const formData = new FormData();
      formData.append('file', image);

      try {
        const s3Response = await fetch('https://flask-backend-estate.onrender.com/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!s3Response.ok) {
          throw new Error('Failed to upload image');
        }

        const s3Result = await s3Response.json();
        imageUrl = s3Result.file_url;
        console.log(s3Result)
      } catch (error) {
        console.error('Error uploading image:', error);
        toast.error('Error uploading image. Please try again.');
        setLoading(false);
        return;
      }
    }

    const newCar = {
      licensePlate,
      make,
      model,
      year,
      residentId,
      imageUrl
    };

    try {
      const response = await fetch('https://flask-backend-estate.onrender.com/api/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCar),
      });

      if (!response.ok) {
        throw new Error('Failed to add car');
      }

      // Clear form after successful submission
      setLicensePlate('');
      setMake('');
      setModel('');
      setYear('');
      setResidentId('');
      setImage(null);
      setImagePreview(null);
      toast.success('Car added successfully!');
    } catch (err) {
      setError('Failed to add car');
      console.error(err);
      toast.error('Failed to add car');
    } finally {
      setLoading(false);
    }
  };

  const filteredResidents = selectedBuilding
    ? residents.filter(resident => resident.houseName === selectedBuilding)
    : [];

  return (
    <div className="container">
      <div className="row">
        {/* Sidebar component would be here */}
        <div className="col py-3">
          <h2>Add Car</h2>
          <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <div className="mb-3">
              <label className="form-label">Choose Building:</label>
              <select
                className="form-select"
                value={selectedBuilding}
                onChange={(e) => {
                  setSelectedBuilding(e.target.value);
                  setResidentId(''); // Reset resident selection when building changes
                }}
                required
              >
                <option value="">Select Building</option>
                {buildings.map((building, index) => (
                  <option key={index} value={building}>
                    {building}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Resident:</label>
              <select
                className="form-select"
                value={residentId}
                onChange={(e) => setResidentId(e.target.value)}
                required
                disabled={!selectedBuilding} // Disable until a building is selected
              >
                <option value="">Select Resident</option>
                {filteredResidents.map((resident) => (
                  <option key={resident._id} value={resident._id}>
                    {resident.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">License Plate:</label>
              <input
                type="text"
                className="form-control"
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Make:</label>
              <input
                type="text"
                className="form-control"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Model:</label>
              <input
                type="text"
                className="form-control"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Year:</label>
              <input
                type="number"
                className="form-control"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Car Image:</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              {imagePreview && <img src={imagePreview} alt="Selected" className="form-control" style={{ marginTop: '10px' }} />}
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Adding...' : 'Add Car'}
            </button>
          </form>
          {loading && (
            <div className="overlay">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          <ToastContainer />
        </div>
      </div>

      <style jsx>{`
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(255, 255, 255, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
      `}</style>
    </div>
  );
};

export default AddCarForm;
