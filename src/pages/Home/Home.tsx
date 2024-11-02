import React, { useState } from 'react';
import { MapDisplay } from '../../components/page/map';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="main-body d-flex">
      <ToastContainer />
      <MapDisplay />

    </div>
  );
};

export default Home;