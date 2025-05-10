import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AnimeDetails from './pages/AnimeDetails';

/**
 * App
 * Defines client-side routing for the application.
 */
const App: React.FC = () => (
  <Routes>
    {/* 
      1) "/" → Home search page 
      2) "/anime/:id" → Details page, reads the `id` param 
      3) Any other path → Redirect back to home 
    */}
    <Route path="/" element={<Home />} />
    <Route path="/anime/:id" element={<AnimeDetails />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;