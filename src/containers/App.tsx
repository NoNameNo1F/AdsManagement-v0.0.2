import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer, Header } from '../components/layout';
import { Home, Login, NotFound } from '../pages/';
import { AdsPointItem, AdsPointsList } from '../components/page/adspoint';
import { Dashboard } from '../components/page/dashboard';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/login"
          element={<Login />}
        ></Route>
        <Route
          path="/dashboard"
        >
          <Route path="" element={<Dashboard />}></Route>
        </Route>
        <Route path="/ads-point">
          <Route path="" element={<AdsPointsList />}></Route>
          {/* <Route path="details/:uuid" element={<AdsPointItem />}></Route> */}
        </Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
};

export default App;
