import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import SecurityDashboard from './pages/SecurityDashboard';
import LicensePlateScanner from './pages/LicensePlateScanner'; 
import LoginPage from './pages/LoginPage';
import Footer from './components/Footer';
import ManualEntry from './pages/ManualEntry';

// Import Admin pages
import ManageResidents from './pages/ManageResidents';
import ManageCars from './pages/ManageCars';
import ManageDrivers from './pages/ManageDrivers';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
      <header class="d-flex flex-wrap justify-content-center pt-3">
      <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
        <svg class="bi me-2" width="40" height="32"><use /></svg>
        <span class="fs-4  fw-bold text-primary">Nikeron</span>
      </a>

    </header>
        <div className="d-flex flex-grow-1">
          <Routes>
            <Route path="/admin" element={<AdminDashboard />}>
              <Route index element={<ManageResidents />} />
              <Route path="residents" element={<ManageResidents />} />
              <Route path="cars" element={<ManageCars />} />
              <Route path="drivers" element={<ManageDrivers />} />
            </Route>
            <Route path="/security" element={<SecurityDashboard />}>
              <Route path="scan" element={<LicensePlateScanner />} />
              <Route path="manual" element={<ManualEntry />} />
              <Route index element={<LicensePlateScanner />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<LoginPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
