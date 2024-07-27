import React, { useState } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Calendar from './components/Calendar';
import RibbonChecker from './components/RibbonChecker';
import CadetStaff from './components/CadetStaff';
import ScrollContainer from './components/ScrollContainer';
import './styles/App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      case 'calendar':
        return <Calendar />;
      case 'ribbon-checker':
        return <RibbonChecker />;
      case 'cadet-staff':
        return <CadetStaff />;
      default:
        return <Home />;
    }
  };

  return (
    <div id="root">
      <Header setCurrentPage={setCurrentPage} />
      <ScrollContainer>
        {renderPage()}
      </ScrollContainer>
    </div>
  );
};

export default App;
