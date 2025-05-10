import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';          // ← import Provider
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { store } from './store';                // ← import your store
import './styles/global.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    {/* 1) Provide the Redux store to the entire app */}
    <Provider store={store}>
      {/* 2) Then wrap with BrowserRouter for routing */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
