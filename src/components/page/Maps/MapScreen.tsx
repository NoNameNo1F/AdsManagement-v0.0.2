import React, { useEffect } from 'react'
import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import { XYZ } from 'ol/source'

function MapScreen() {
  useEffect(() => {
    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        })
      ],
      view: new View({
        center: [10.743387, 106.630229],
        zoom: 2
      })
    });
    return () => map.setTarget();
  }, []);

  return (
    <div id="map" style={{ width: '100%', height: '100vh' }}>
      Map
    </div>
  )
}

export default MapScreen