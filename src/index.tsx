import React from 'react';
import ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/global.css';  // Global styles moved into styles folder

// Create React root and wrap App in BrowserRouter for routing
const root = ReactDOMClient.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />  {/* Main app with defined routes */}
    </BrowserRouter>
  </React.StrictMode>
);