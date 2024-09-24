

import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddResidentForm = () => {
  const [name, setName] = useState('');
  const [houseName, setHouseName] = useState('');
  const [flatNumber, setFlatNumber] = useState('');
  const [floorNumber, setFloorNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const isValid = name && houseName && flatNumber && floorNumber && phoneNumber && image;
    setIsFormValid(isValid);
  }, [name, houseName, flatNumber, floorNumber, phoneNumber, image]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setName('');
    setHouseName('');
    setFlatNumber('');
    setFloorNumber('');
    setPhoneNumber('');
    setImage(null);
    setImagePreview(null);
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      toast.error('Please fill all required fields');
      return;
    }

    setIsLoading(true);

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
        console.log(s3Result);
      } catch (error) {
        console.error('Error uploading image:', error);
        toast.error('Error uploading image. Please try again.');
        setIsLoading(false);
        return;
      }
    }

    const newResident = {
      name,
      houseName,
      flatNumber,
      floorNumber,
      phoneNumber,
      imageUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      const response = await fetch('https://flask-backend-estate.onrender.com/api/residents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newResident),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      await response.json();
      toast.success('Resident added successfully!');
      resetForm();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error adding resident. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="position-relative">
      <form onSubmit={handleSubmit} className="container mt-3">
        <h2 className="mb-4">Add Resident</h2>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input 
            type="text" 
            className="form-control" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">House Name:</label>
          <input 
            type="text" 
            className="form-control" 
            value={houseName} 
            onChange={(e) => setHouseName(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Flat Number:</label>
          <input 
            type="text" 
            className="form-control" 
            value={flatNumber} 
            onChange={(e) => setFlatNumber(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Floor Number:</label>
          <input 
            type="text" 
            className="form-control" 
            value={floorNumber} 
            onChange={(e) => setFloorNumber(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number:</label>
          <input 
            type="text" 
            className="form-control" 
            value={phoneNumber} 
            onChange={(e) => setPhoneNumber(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Image:</label>
          <input 
            type="file" 
            className="form-control" 
            accept="image/*" 
            onChange={handleImageChange} 
            required 
          />
          {imagePreview && <img src={imagePreview} alt="Selected" className="form-control" style={{ marginTop: '10px' }} />}
        </div>
        <button type="submit" className="btn btn-primary" disabled={!isFormValid || isLoading}>
          {isLoading ? 'Adding Resident...' : 'Add Resident'}
        </button>
      </form>
      {isLoading && (
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default AddResidentForm;