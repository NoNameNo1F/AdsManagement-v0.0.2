import React, { useEffect, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Feature, Tile } from 'ol';
import { Point } from 'ol/geom';
import { Style, Icon, Circle as CircleStyle, Fill, Stroke } from 'ol/style';
import TileLayer from 'ol/layer/Tile'
import { TileJSON, XYZ } from 'ol/source'

import { GeoJSON } from 'ol/format';


import { defaults as defaultControls, ScaleLine, FullScreen, MousePosition, Attribution, Rotate } from 'ol/control';
import { PinchRotate, Select } from 'ol/interaction';
import { click } from 'ol/events/condition';
import TileSource from 'ol/source/Tile';
// import { mapConfigs } from '../../../configurations/maps';
// import config from '../../../config/config'


interface SelectedFeatureInfo {
    type: string | null;
    coordinates: number[] | null;
};

function MapRegion() {
    const key: string = import.meta.env.VITE_MAP_API;

    const [selectedFeatureInfo, setSelectedFeatureInfo] = useState<SelectedFeatureInfo>({
        type: null,
        coordinates: null
    });

    useEffect(() => {
        const baseLayer = new TileLayer({
            source: new TileJSON({
                url: `https://api.maptiler.com/maps/streets-v2/tiles.json?key=${key}`,
                tileSize: 512,
                crossOrigin: 'anonymous'
            }),
            /*
                Another way to generate base maps
                new TileLayer({
                    source: new XYZ({
                        url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                    })
                }),
            */
        });
        
        const overviewLayer = new VectorLayer({
            source: new VectorSource({
                url: `https://api.maptiler.com/data/5dd8ce8b-d67c-44b8-9052-f58aa9f71427/features.json?key=${key}`,
                format: new GeoJSON(),
                loader: function (extent, resolution, projection) {
                    const url = `https://api.maptiler.com/data/5dd8ce8b-d67c-44b8-9052-f58aa9f71427/features.json?key=${key}`;
                    fetch(url)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data)
                        const filteredFeatures = data.features.filter((feature: any) => {
                            const name = feature.properties.text;
                            return name === 'District 1';
                        });
                        const geojson = {
                            type: 'FeatureCollection',
                            features: filteredFeatures
                        };
                        const format = new GeoJSON();
                        const features = format.readFeatures(geojson, {
                            featureProjection: projection
                        });
                        (this as VectorSource).addFeatures(features);
                    });
                }
            }),
            style: new Style({
                stroke: new Stroke({
                    color: 'rgba(0, 217, 136, 0.8)',
                }),
                fill: new Fill({
                    color: 'rgba(0, 136, 136, 0.3)',
                }),
            }),
        })


        // Create a new map instance
        const map = new Map({
            target: 'map',
            layers: [
                baseLayer,
                overviewLayer,
            ],
            view: new View({
                center: fromLonLat([106.630076, 10.742332]),
                zoom:16
            }),
            controls: defaultControls().extend([
                // new ScaleLine(),
                // new MousePosition(),
            ])
        });
        
        /*
        Add interaction for selecting features
        */
        const select = new Select({
            condition: click
        });

        // const pinchRotate = new PinchRotate({
            
        // })
        map.addInteraction(select);

        // Listen for select event
        select.on('select', (e) => {
            if (e.selected.length > 0) {
                
                const selectedFeature = e.selected[0];
                const geometry = selectedFeature.getGeometry();
                if (geometry) {
                    if (geometry instanceof Point) {
                        const coords = geometry.getCoordinates();
                        const lonLat = toLonLat(coords);
                        setSelectedFeatureInfo({
                            type: 'Point',
                            coordinates: lonLat
                        });
                    } else {
                        setSelectedFeatureInfo({
                            type: geometry.getType(),
                            coordinates: null
                        });
                    }
                }
                
            } else {
                setSelectedFeatureInfo({
                    type: null,
                    coordinates: null
                });
            }
        })
        return () => {
            // Cleanup function to remove the map when the component unmounts
            map.setTarget();
        };
    }, []); // Empty dependency array ensures this effect runs only once

    return (
        <div id="map" style={{ width: '100vw', height: '100vh' }}>
            {/* The map will be rendered inside this div */}
            {selectedFeatureInfo && (
                <div className="" style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    backgroundColor: "white",
                    padding: "10px",
                }}>
                    <p><strong>Type:</strong> {selectedFeatureInfo.type}</p>
                    <p><strong>Coordinates:</strong> {selectedFeatureInfo.coordinates ?selectedFeatureInfo.coordinates.join(', ') : ""}</p>
                </div>
            )}
        </div>
    );
}

export default MapRegion;
