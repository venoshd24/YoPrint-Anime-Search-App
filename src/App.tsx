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
    {/* Home page route */}
    <Route path="/" element={<Home />} />
    {/* Dynamic anime details route */}
    <Route path="/anime/:id" element={<AnimeDetails />} />
    {/* Fallback to Home for unknown paths */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;