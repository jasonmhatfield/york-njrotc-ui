import React, { useCallback, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Home from './components/home/Home';
import About from './components/about/About';
import Calendar from './components/calendar/Calendar';
import RibbonChecker from './components/ribbon-checker/RibbonChecker';
import CadetStaff from './components/cadet-staff/CadetStaff';
import PQS from './components/pqs/PQS';
import Quarterdeck from './components/quarterdeck/Quarterdeck';
import AdminDashboard from './admin/AdminDashboard';
import LoginModal from './admin/LoginModal/LoginModal';
import { useAuth } from './admin/context/AuthContext';
import Header from './components/header/Header';
import AdminHeader from './admin/header/AdminHeader';
import config from './config/config';

const App = () => {
  const { isAuthenticated, isLoading, token, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toLocaleString('en-US', { month: 'long' }));
  const isAdminPath = location.pathname.startsWith('/admin');

  const handleMonthSelect = useCallback((month) => {
    setSelectedMonth(month);
  }, []);

  // Validate token on initial load
  const validateToken = useCallback(async () => {
    if (!token) return;

    try {
      const response = await fetch('http://localhost:8080/api/validate-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        logout();
        navigate('/');
      }
    } catch (error) {
      console.error('Error validating token:', error);
      logout();
      navigate('/');
    }
  }, [token, logout, navigate]);

  React.useEffect(() => {
    validateToken();
  }, [validateToken]);

  React.useEffect(() => {
    if (isAdminPath && !isAuthenticated && !isLoading) {
      setShowLoginModal(true);
    } else {
      setShowLoginModal(false);
    }
  }, [isAdminPath, isAuthenticated, isLoading]);

  if (isLoading) return null;

  return (
    <>
      {isAdminPath ? <AdminHeader /> : <Header onMonthSelect={handleMonthSelect} />}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/calendar" element={<Calendar config={config} selectedMonth={selectedMonth} />} />
        <Route path="/ribbon-checker" element={<RibbonChecker />} />
        <Route path="/cadet-staff" element={<CadetStaff />} />
        <Route path="/pqs" element={<PQS />} />
        <Route path="/quarterdeck" element={<Quarterdeck />} />
        <Route path="/admin/*" element={isAuthenticated ? <AdminDashboard /> : <Home />} />
      </Routes>
    </>
  );
};

export default App;