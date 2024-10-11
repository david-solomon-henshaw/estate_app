import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import SecurityDashboard from './pages/SecurityDashboard';
import ResidentDashboard from './pages/ResidentDashboard'; // Import ResidentDashboard
import LicensePlateScanner from './pages/LicensePlateScanner';
import LoginPage from './pages/LoginPage';
import Footer from './components/Footer';
import ManualEntry from './pages/ManualEntry';

// Import Admin pages
import ManageResidents from './pages/ManageResidents';
import ManageCars from './pages/ManageCars';
import ManageDrivers from './pages/ManageDrivers';
import ResidentCard from './components/ResidentCard';

// Import Resident pages (default components for now)
import AddVisitor from './pages/AddVisitor'; // Placeholder for AddVisitor component
import ResidentHistory from './pages/ResidentHistory'; // Placeholder for ResidentHistory component
import ResidentProfile from './pages/ResidentProfile'; // Placeholder for ResidentProfile component
import ManageResidentCars from './pages/ManageResidentCars';  // Placeholder for Cars
import ManageResidentDrivers from './pages/ManageResidentDrivers';  // Placeholder for Drivers
import VisitorHistory from './pages/VisitorHistory';  // Placeholder for Visitor History page

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <header className="d-flex flex-wrap justify-content-center pt-3">
          <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
            <span className="fs-4 fw-bold text-primary">Nikeron</span>
          </a>
        </header>
        <div className="d-flex flex-grow-1">
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />}>
              <Route index element={<ManageResidents />} />
              <Route path="residents" element={<ManageResidents />} />
              <Route path="cars" element={<ManageCars />} />
              <Route path="drivers" element={<ManageDrivers />} />
            </Route>

            {/* Security Routes */}
            <Route path="/security" element={<SecurityDashboard />}>
              <Route path="scan" element={<LicensePlateScanner />} />
              <Route path="manual" element={<ManualEntry />} />
              <Route index element={<LicensePlateScanner />} />
              <Route path="resident" element={<ResidentCard />} />
            </Route>

            {/* Resident Routes */}
            <Route path="/resident" element={<ResidentDashboard />}>
              <Route path="add-visitor" element={<AddVisitor />} /> {/* Placeholder for AddVisitor */}
              <Route path="history" element={<ResidentHistory />} /> {/* Placeholder for ResidentHistory */}
              <Route path="profile" element={<ResidentProfile />} /> {/* Placeholder for ResidentProfile */}
              <Route path="cars" element={<ManageResidentCars />} />
              <Route path="drivers" element={<ManageResidentDrivers />} />
              <Route path="visitor-history" element={<VisitorHistory />} />
            </Route>

            {/* Default Route for Login */}
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
