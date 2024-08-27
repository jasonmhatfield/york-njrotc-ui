import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import AdminHeader from '../src/components/admin/header/AdminHeader';  // New Admin Header
import Home from './components/Home';
import About from './components/About';
import Calendar from './components/Calendar';
import RibbonChecker from './components/RibbonChecker';
import CadetStaff from './components/CadetStaff';
import PQS from './components/PQS';
import Quarterdeck from './components/Quarterdeck';
import August2023 from './events/2023/08-August';
import September2023 from './events/2023/09-September';
import October2023 from './events/2023/10-October';
import November2023 from './events/2023/11-November';
import AdminDashboard from '../src/components/admin/AdminDashboard';

import config from './config/config'

const App = () => {
  const location = useLocation(); // Get current location
  const isAdminRoute = location.pathname.startsWith('/admin'); // Check if it's an admin route

  return (
    <div>
      {isAdminRoute ? <AdminHeader /> : <Header />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="calendar" element={<Calendar config={config} />} />
        <Route path="ribbon-checker" element={<RibbonChecker />} />
        <Route path="cadet-staff" element={<CadetStaff />} />
        <Route path="pqs" element={<PQS />} />
        <Route path="quarterdeck" element={<Quarterdeck />} />
        <Route path="events/2023/08-August" element={<August2023 />} />
        <Route path="events/2023/09-September" element={<September2023 />} />
        <Route path="events/2023/10-October" element={<October2023 />} />
        <Route path="events/2023/11-November" element={<November2023 />} />

        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
};

export default App;
