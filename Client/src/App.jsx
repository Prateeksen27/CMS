import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from "./components/Header.jsx";
import LandingPage from './pages/LandingPage.jsx';
import EventsPage from './pages/EventPage.jsx';
import { Routes,Route } from 'react-router-dom';
import About from './pages/AboutPage.jsx';
import Footer from './components/Footer.jsx';
import Gallary from './pages/Gallery.jsx';


function App() {


  return (
        <div className="min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/services" element={<EventsPage/>}/>
        <Route path="/gallery" element={<Gallary/>}/>
        
      </Routes>
    <Footer/>

    </div>
  );
}

export default App
