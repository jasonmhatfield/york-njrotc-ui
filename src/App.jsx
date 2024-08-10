import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Calendar from './components/Calendar';
import RibbonChecker from './components/RibbonChecker';
import CadetStaff from './components/CadetStaff';
import ScrollContainer from './components/ScrollContainer';
import PQS from './components/PQS';
import Quarterdeck from './components/Quarterdeck';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <div id="root">
        <Header />
        <ScrollContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/ribbon-checker" element={<RibbonChecker />} />
            <Route path="/cadet-staff" element={<CadetStaff />} />
            <Route path="/pqs" element={<PQS />} />
            <Route path="/quarterdeck" element={<Quarterdeck />} />
            {/* Add more routes here as needed */}
          </Routes>
        </ScrollContainer>
      </div>
    </Router>
  );
};

export default App;
