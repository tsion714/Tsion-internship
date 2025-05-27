import Home from "./pages/Home";
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import AOS from "aos";
import 'aos/dist/aos.css';
import { useEffect } from "react";


function AppContent() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  useEffect(() => {
    AOS.refresh(); 
  }, [location]);
  
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/author/:authorId" element={<Author />} />
        <Route path="/item-details/:nftId" element={<ItemDetails />} />

        <Route path="/item-details" element={<ItemDetails />} />

      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
export default App;
