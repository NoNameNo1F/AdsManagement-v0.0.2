import React from 'react'
import { MapRegion, MapScreen, MapTest } from '../components/page';

function Home() {
  return (
      <div>
          <div className="container p-2">
        {/* <MapTest /> */}
        <MapRegion />
          </div>
    </div>
  )
}

export default Home