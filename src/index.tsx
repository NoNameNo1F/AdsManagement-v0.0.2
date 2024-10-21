import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './containers/App';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "ol/ol.css";
import "./index.css";
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root')!
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);