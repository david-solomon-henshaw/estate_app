// src/pages/VisitorHistory.js
import React from 'react';

const VisitorHistory = () => {
  const visitors = [
    { name: 'John Doe', date: '2024-10-01', reason: 'Business Meeting' },
    { name: 'Jane Smith', date: '2024-10-05', reason: 'Family Visit' },
  ];

  return (
    <div className="container mt-4">
      <h2>Visitor History</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {visitors.map((visitor, index) => (
            <tr key={index}>
              <td>{visitor.name}</td>
              <td>{visitor.date}</td>
              <td>{visitor.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VisitorHistory;
