import React, { useState } from 'react';
import { FaUserFriends, FaTruck, FaTools, FaRegUser } from 'react-icons/fa';

const AddVisitor = () => {
  const [visitorName, setVisitorName] = useState('');
  const [visitorType, setVisitorType] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic validation
    if (!visitorName || !visitorType || !visitDate) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);

    // Reset form and show success message
    setVisitorName('');
    setVisitorType('');
    setVisitDate('');
    setSuccess('Visitor added successfully!');
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Add Visitor</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label htmlFor="visitorName" className="form-label">Visitor Name</label>
            <input
              type="text"
              id="visitorName"
              className="form-control"
              value={visitorName}
              onChange={(e) => setVisitorName(e.target.value)}
              required
              placeholder="Enter visitor's name"
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="visitorType" className="form-label">Visitor Type</label>
            <select
              id="visitorType"
              className="form-select"
              value={visitorType}
              onChange={(e) => setVisitorType(e.target.value)}
              required
            >
              <option value="">-- Select Visitor Type --</option>
              <option value="guest">
                <FaRegUser /> Guest
              </option>
              <option value="delivery">
                <FaTruck /> Delivery
              </option>
              <option value="maintenance">
                <FaTools /> Maintenance
              </option>
              <option value="worker">
                <FaUserFriends /> Worker
              </option>
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="visitDate" className="form-label">Visit Date</label>
            <input
              type="date"
              id="visitDate"
              className="form-control"
              value={visitDate}
              onChange={(e) => setVisitDate(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Adding Visitor...' : 'Add Visitor'}
        </button>
        {loading && <div className="mt-3 text-center">Loading...</div>}
      </form>
    </div>
  );
};

export default AddVisitor;
