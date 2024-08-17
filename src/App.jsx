import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
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

// Admin Imports
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/Dashboard';

// Manager Components
import EntityManager from './components/admin/EntityManager';

// Configuration import
import config from './config/config';

import './styles/App.css';

// Public Layout
const PublicLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div id="root">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="ribbon-checker" element={<RibbonChecker />} />
            <Route path="cadet-staff" element={<CadetStaff />} />
            <Route path="pqs" element={<PQS />} />
            <Route path="quarterdeck" element={<Quarterdeck />} />
            <Route path="events/2023/08-August" element={<August2023 />} />
            <Route path="events/2023/09-September" element={<September2023 />} />
            <Route path="events/2023/10-October" element={<October2023 />} />
            <Route path="events/2023/11-November" element={<November2023 />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            {/* Dashboard */}
            <Route index element={<Dashboard />} />

            {/* Entity Managers */}
            <Route path="awards" element={<EntityManager entity="awards" />} />
            <Route path="cadets" element={<EntityManager entity="cadets" />} />
            <Route path="events" element={<EntityManager entity="events" />} />
            <Route path="family" element={<EntityManager entity="family" />} />
            <Route path="ranks" element={<EntityManager entity="ranks" />} />
            <Route path="units" element={<EntityManager entity="units" />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
