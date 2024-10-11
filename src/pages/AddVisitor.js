// src/pages/AddVisitor.js
import React, { useState } from 'react';

const AddVisitor = () => {
  const [visitorName, setVisitorName] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to add visitor (e.g., API call)
    console.log({ visitorName, visitDate, reason });
    // Clear form fields after submission
    setVisitorName('');
    setVisitDate('');
    setReason('');
  };

  return (
    <div className="container mt-4">
      <h2>Add Visitor</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Visitor Name</label>
          <input
            type="text"
            className="form-control"
            value={visitorName}
            onChange={(e) => setVisitorName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Visit Date</label>
          <input
            type="date"
            className="form-control"
            value={visitDate}
            onChange={(e) => setVisitDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Reason for Visit</label>
          <textarea
            className="form-control"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Visitor</button>
      </form>
    </div>
  );
};

export default AddVisitor;
