import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [role, setRole] = useState(''); // State for the selected role
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Redirect based on selected role
    if (role === 'admin') {
      navigate('/admin'); // Redirect to Admin Dashboard
    } else if (role === 'security') {
      navigate('/security'); // Redirect to Security Dashboard
    } else if (role === 'resident') {
      navigate('/resident'); // Redirect to Resident Dashboard
    } else {
      setError('Please select a role');
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Login Page</h1>
      <div className="row justify-content-center mt-4">
        <div className="col-md-6">
          <div className="card shadow"> {/* Card with shadow */}
            <div className="card-body">
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label">Select Role:</label>
                  <select 
                    className="form-select shadow" 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)} 
                    required
                  >
                    <option value="">-- Select Role --</option>
                    <option value="admin">Admin</option>
                    <option value="security">Security</option>
                    <option value="resident">Resident</option> {/* New Resident Role */}
                  </select>
                </div>
                {error && <p className="text-danger">{error}</p>}
                <button type="submit" className="shadow btn btn-primary w-100">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
