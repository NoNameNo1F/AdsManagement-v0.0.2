import React, { useState } from 'react';
import { MapRegion, MapScreen, MapDisplay } from '../../components/page/map';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
// import './Home.css'

const Home: React.FC = () => {
  const [displayAdsPointList, setDisplayAdsPointList] = useState<boolean>(false);

  const [displayReportList, setDisplayReportList] = useState<boolean>(false);

  const [displayAdsPoint, setDisplayAdsPoint] = useState<boolean>(false);

  const [displayReportItem, setDisplayReportItem] = useState<boolean>(false);

  return (
    <div className="main-body d-flex">
      <ToastContainer />
      <MapDisplay />

    </div>
  );
};

export default Home;