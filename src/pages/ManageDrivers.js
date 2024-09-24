import React, { useState, useRef, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddAuthorizedDriverForm = () => {
  const [name, setName] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [residentId, setResidentId] = useState("");
  const [useCamera, setUseCamera] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [residents, setResidents] = useState([]);
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const response = await fetch("https://flask-backend-estate.onrender.com/api/residents");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setResidents(data);
      } catch (error) {
        console.error("Error fetching residents:", error);
      }
    };

    const fetchCars = async () => {
      try {
        const response = await fetch("https://flask-backend-estate.onrender.com/api/cars");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchResidents();
    fetchCars();
  }, []);

  useEffect(() => {
    if (residentId) {
      const filtered = cars.filter((car) => car.residentId === residentId);
      setFilteredCars(filtered);
    } else {
      setFilteredCars([]);
    }
  }, [residentId, cars]);

  useEffect(() => {
    if (useCamera) {
      startCamera();
    }

    return () => {
      stopCamera();
    };
  }, [useCamera]);

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  let uploadedPictureUrl = '';
  let fileToUpload; // Declare the variable here to use it in both branches

  if (pictureUrl) {
    if (pictureUrl.startsWith('data:image')) {
      // Convert data URL to Blob
      const response = await fetch(pictureUrl);
      fileToUpload = await response.blob();
    } else {
      // It's already a File object
      fileToUpload = pictureUrl;
    }

    const formData = new FormData();
    formData.append('file', fileToUpload, 'driver_photo.png');

    try {
      const s3Response = await fetch('https://flask-backend-estate.onrender.com/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!s3Response.ok) {
        throw new Error('Failed to upload image');
      }

      const s3Result = await s3Response.json();
      uploadedPictureUrl = s3Result.file_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error uploading image. Please try again.');
      setLoading(false);
      return;
    }
  }

  const newDriver = {
    name,
    pictureUrl: uploadedPictureUrl, // Use the uploaded picture URL
    vehicleId,
    residentId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  try {
    const response = await fetch("https://flask-backend-estate.onrender.com/api/drivers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDriver),
    });

    if (!response.ok) {
      throw new Error("Failed to add driver");
    }

    toast.success("Authorized driver added successfully!");

    // Clear form fields
    setName("");
    setPictureUrl("");
    setVehicleId("");
    setResidentId("");
  } catch (error) {
    console.error("Error adding driver:", error);
    toast.error("Error adding authorized driver. Please try again.");
  } finally {
    setLoading(false);
  }
};





  const handleToggle = () => {
    setUseCamera((prev) => !prev);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPictureUrl(reader.result);
        setCameraActive(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCapture = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      setPictureUrl(canvas.toDataURL("image/png"));
      setCameraActive(false);

      const modal = window.bootstrap.Modal.getInstance(
        document.getElementById("cameraModal")
      );
      if (modal) {
        modal.hide();
      }
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      setCameraActive(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      toast.error(
        "Failed to access the camera. Please check your camera permissions."
      );
    }
  };

  const stopCamera = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
      setCameraActive(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2>Add Authorized Driver</h2>

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
        <label className="form-label">Resident:</label>
        <select
          className="form-select"
          value={residentId}
          onChange={(e) => setResidentId(e.target.value)}
          required
        >
          <option value="">Select a Resident</option>
          {residents.map((resident) => (
            <option key={resident._id} value={resident._id}>
              {resident.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Vehicle:</label>
        <select
          className="form-select"
          value={vehicleId}
          onChange={(e) => setVehicleId(e.target.value)}
          required
        >
          <option value="">
            {residentId ? "Select a Vehicle" : "Select a Resident First"}
          </option>
          {filteredCars.map((car) => (
            <option key={car._id} value={car._id}>
              {car.licensePlate} - {car.make} {car.model}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Picture:</label>
        <button
          type="button"
          className="btn btn-secondary mb-2 form-control"
          onClick={handleToggle}
          {...(!useCamera && {
            "data-bs-toggle": "modal",
            "data-bs-target": "#cameraModal",
          })}
        >
          {useCamera ? "Switch to File Upload" : "Switch to Camera"}
        </button>

        {!useCamera && (
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
        )}
        {pictureUrl && (
          <img src={pictureUrl} alt="Preview" className="mt-3 form-control" />
        )}
      </div>

      <button type="submit" className="btn btn-success" disabled={loading}>
        {loading ? "Adding Driver..." : "Add Driver"}
      </button>

      {/* Modal for Camera View */}
      <div
        className="modal fade"
        id="cameraModal"
        tabIndex="-1"
        aria-labelledby="cameraModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close bg-danger"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {useCamera && (
                <div>
                  <video
                    ref={videoRef}
                    width="100%"
                    height="auto"
                    autoPlay
                    style={{ display: cameraActive ? "block" : "none" }}
                  />
                  <canvas ref={canvasRef} style={{ display: "none" }} />
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCapture}
                disabled={!cameraActive}
              >
                Capture Photo
              </button>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </form>
  );
};

export default AddAuthorizedDriverForm;
