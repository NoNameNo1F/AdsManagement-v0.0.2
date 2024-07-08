import React, { useEffect, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Style, Icon, Circle as CircleStyle, Fill, Stroke } from 'ol/style';
import TileLayer from 'ol/layer/Tile'
import { XYZ } from 'ol/source'

import {
    lineFeature,
    polygonFeature,
    circleFeature,
    multiPointFeature,
    multiLineStringFeature,
    multiPolygonFeature
} from "./features";

import { defaults as defaultControls, ScaleLine, FullScreen } from 'ol/control';
import { Select } from 'ol/interaction';
import { click } from 'ol/events/condition';

function MapTest() {
    const [selectedFeatureInfo, setSelectedFeatureInfo] = useState<{
        type: string | null,
        coordinates: number[] | null;
    }>({
        type: null,
        coordinates: null
    });

    useEffect(() => {
        // Create a vector source and add a point feature
        const vectorSource = new VectorSource({
            features: [
                new Feature({
                    geometry: new Point(fromLonLat([0, 0]))  // Coordinates in lon, lat format

                }),
                new Feature({
                    geometry: new Point(fromLonLat([11.12312421, 12.12312421]))  // Coordinates in lon, lat format
                }),
                new Feature({
                    geometry: new Point(fromLonLat([11, 12]))  // Coordinates in lon, lat format
                }),
                lineFeature,
                polygonFeature,
                circleFeature,
                multiPointFeature,
                multiLineStringFeature,
                multiPolygonFeature
            ]
        });

        // const pointStyle = new Style({
        //     image: new CircleStyle({
        //         radius: 5,
        //         fill: new Fill({ color: 'red' }),
        //         stroke: new Stroke({
        //             color: 'black',
        //             width: 1
        //         })
        //     })
        // });
        // Create a vector layer using the vector source
        const vectorLayer = new VectorLayer({
            source: vectorSource,
            // style: pointStyle
            style: new Style({
                stroke: new Stroke({
                    color: "blue",
                    width: 2
                }),
                fill: new Fill({
                    color: "rgba(0,0,255,0.1)"
                })
            })
        });

        // Create a new map instance
        const map = new Map({
            target: 'map', // ID of the div where the map will be rendered
            layers: [
                new TileLayer({
                    source: new XYZ({
                        url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                    })
                }),
                // Add the vector layer to the map
                vectorLayer
            ],
            view: new View({
                center: fromLonLat([106.630076, 10.742332]), // Initial center of the map
                zoom:16 // Initial zoom level, 
            }),
            controls: defaultControls().extend([
                new ScaleLine(),
                new FullScreen()
            ])
        });
        
        /*
        Add interaction for selecting features
        */
        const select = new Select({
            condition: click
        });

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

export default MapTest;
