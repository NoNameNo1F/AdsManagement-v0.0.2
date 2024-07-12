import React from 'react'
import { MapRegion, MapScreen, MapTest } from '../components/page';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Home() {
  return (
      <div>
          <div className="container p-3">
        {/* <MapTest /> */}
        <ToastContainer />
        <MapRegion />
          </div>
    </div>
  )
}

export default Home