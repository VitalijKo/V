import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ContractProvider } from './contexts/ContractContext';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContractProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContractProvider>
  </React.StrictMode>
);

reportWebVitals();
