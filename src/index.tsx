import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './containers/App';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "ol/ol.css"

const root = ReactDOM.createRoot(
  document.getElementById('root')!
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);