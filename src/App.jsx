import React, { useCallback } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Calendar from './components/Calendar';
import RibbonChecker from './components/RibbonChecker';
import CadetStaff from './components/CadetStaff';
import PQS from './components/PQS';
import Quarterdeck from './components/Quarterdeck';
import AdminDashboard from './components/admin/AdminDashboard';
import LoginModal from './components/admin/LoginModal/LoginModal';
import { useAuth } from './components/admin/context/AuthContext';
import Header from './components/Header';
import AdminHeader from './components/admin/header/AdminHeader';
import config from './config/config';

const App = () => {
  const { isAuthenticated, isLoading, token, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const isAdminPath = location.pathname.startsWith('/admin');

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
      {isAdminPath ? <AdminHeader /> : <Header />}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/calendar" element={<Calendar config={config} />} />
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
