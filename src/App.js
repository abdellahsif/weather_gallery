import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';  // Create a Search page component if needed
import CityDetail from './pages/CityDetail'; // Import the CityDetail page
import Navbar from './components/Navbar';
import Footer from './components/Footer';  // Import Footer component

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page */}
        <Route path="/search" element={<Search />} /> {/* Search page */}
        <Route path="/city-detail/:cityName" element={<CityDetail />} /> {/* City Detail page */}
      </Routes>
      <Footer /> {/* Add Footer here */}
    </Router>
  );
};

export default App;
