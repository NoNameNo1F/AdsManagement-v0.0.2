import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer, Header } from '../components/layout';
import { Home, NotFound } from '../pages/';
import { AdsPointItem, AdsPointsList } from '../components/page/adspoint';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/login"
          element={<Home />}
        ></Route>

        <Route path="/ads-point">
          <Route path="" element={<AdsPointsList />}></Route>
          {/* <Route path="details/:uuid" element={<AdsPointItem />}></Route> */}
        </Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
