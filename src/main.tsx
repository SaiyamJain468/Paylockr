// Made by Saiyam Jain - https://github.com/saiyamjain468
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';
import './utils/startupDiagnostic'; // Auto-run API checks
import { ErrorBoundaryWithDiagnostics } from './components/common/ErrorBoundaryWithDiagnostics';

// Register service worker for PWA
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundaryWithDiagnostics>
      <App />
    </ErrorBoundaryWithDiagnostics>
  </React.StrictMode>
);
