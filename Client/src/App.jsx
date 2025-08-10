import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from "./components/Header.jsx";
import LandingPage from './pages/LandingPage.jsx';
import EventsPage from './pages/EventPage.jsx';
import { Routes,Route } from 'react-router-dom';


function App() {


  return (
        <div className="min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/events" element={<EventsPage/>}/>
      </Routes>
    </div>
  );
}

export default App
