import React, { useEffect, useState } from 'react';
import { Feature, Tile, Map, View } from 'ol';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Geometry, Point } from 'ol/geom';
import { GeoJSON } from 'ol/format';
import { TileJSON, XYZ } from 'ol/source';
import { createStringXY } from 'ol/coordinate';
import { Style, Icon, Circle as CircleStyle, Fill, Stroke } from 'ol/style';
import {
    defaults as defaultControls,
    ScaleLine,
    FullScreen,
    MousePosition,
    Attribution,
    Rotate,
    OverviewMap,
    Zoom,
    ZoomSlider,
    ZoomToExtent
} from 'ol/control';
import {
    defaults as defaultInteractions,
    DragAndDrop,
    DragBox,
    DragPan,
    DragRotate,
    DragRotateAndZoom,
    DragZoom,
    Draw,
    Extent,
    MouseWheelZoom,
    PinchRotate,
    Pointer,
    Select,
    Snap,
    Translate
} from 'ol/interaction';
import VectorLayer from 'ol/layer/Vector';
import TileLayer from 'ol/layer/Tile';
import VectorSource from 'ol/source/Vector';
import TileSource from 'ol/source/Tile';
import { click, never, shiftKeyOnly } from 'ol/events/condition';

import axios from "axios";

interface SelectedFeatureInfo {
    type: string | null;
    coordinates: number[] | null;
};


const formatCoordinate = (coordinate: any) => {
    const lonLat = toLonLat(coordinate);
    const lon = lonLat[0].toFixed(6);
    const lat = lonLat[1].toFixed(6);
    return `Longitude: ${lon}, Latitude: ${lat}`;
};


const overviewMapControl = new OverviewMap({
    collapsed: false,
    collapseLabel: '\u00BB',
    label: '\u00AB',
    tipLabel: 'Overview map',
    layers: [
        new TileLayer({
            source: new XYZ({
                url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        })
    ],
    view: new View({
        projection: 'EPSG:3857',
        center: fromLonLat([0, 0]),
        zoom: 2
    }),
    className: 'ol-overviewmap ol-custom-overviewmap',
    rotateWithView: true
});

function MapRegion() {
    const key = import.meta.env.VITE_MAP_API;

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
                    axios.get(url)
                        .then(response => {
                            const data = response.data;
                            console.log(data);
                            const filteredFeatures = data.features.filter((feature: any) => {
                                const name = feature.properties.text;
                                const type = feature.geometry.type;
                                return name && (type === 'Polygon' || type === 'Point');
                            });
                            console.log(filteredFeatures);
                            const geojson = {
                                type: 'FeatureCollection',
                                features: filteredFeatures
                            };
                            const format = new GeoJSON();
                            const features = format.readFeatures(geojson, {
                                featureProjection: projection
                            });
                            (this as VectorSource).addFeatures(features);
                        })
                        .catch(error => {
                            console.error("Error fetching data", error);
                        });
                }
            }),
            style: new Style({
                stroke: new Stroke({
                    color: 'rgba(28, 33, 203, 0.8)',
                }),
                fill: new Fill({
                    color: 'rgba(234, 183, 120, 0.3)',
                }),
                image: new CircleStyle({
                    radius: 5,
                    fill: new Fill({
                        color: 'rgba(255, 0, 0, 0.8)',
                    }),
                    stroke: new Stroke({
                        color: 'rgba(255, 255, 255, 0.8)',
                        width: 1
                    }),
                }),
            }),
        });


        // Create a new map instance
        const map = new Map({
            target: 'map',
            layers: [
                baseLayer,
                overviewLayer,
            ],
            view: new View({
                center: fromLonLat([106.630076, 10.742332]),
                zoom: 16
            }),
            controls: defaultControls().extend([
                new ScaleLine(),
                // new Attribution(),
                new FullScreen(),
                new MousePosition({
                    coordinateFormat: formatCoordinate,
                    projection: 'EPSG:3857',
                    className: 'custom-mouse-position',
                }),
                overviewMapControl,
            ]),
            interactions: defaultInteractions({
                shiftDragZoom: false,
            }).extend([
                new DragRotate({
                    condition: shiftKeyOnly
                }),
            ]),
        });

        const select = new Select({
            condition: click
        });
        
        map.addInteraction(select);

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
        });

        const source = overviewLayer.getSource();
        if (source) {
            const draw = new Draw({
                source: source,
                type: 'Point'
            });
            map.addInteraction(draw);
            
            draw.on('drawend', (event) => {
                const feature = event.feature;
                const format = new GeoJSON();
                const newFeatureGeoJSON = format.writeFeatureObject(feature, {
                    featureProjection: "EPSG: 3857"
                });

                const existsingFeatureGeoJSON = format.writeFeaturesObject(source.getFeatures(), {
                    featureProjection: "EPSG: 3857"
                });

                existsingFeatureGeoJSON.features.push(newFeatureGeoJSON);

                updateGeoJSONData(existsingFeatureGeoJSON)
            });
            const updateGeoJSONData = (updatedGeoJSON: any) => {
                const url = `https://api.maptiler.com/data/5dd8ce8b-d67c-44b8-9052-f58aa9f71427/features.json?key=${key}`;

                axios.put(url, updatedGeoJSON)
                    .then(response => {
                        console.log("GeoJSON data updated successfully:", response.data);
                    })
                    .catch(error => {
                        console.error("Error updating GeoJSON data:", error);
                    });
            }
        }

        

        return () => {
            // Cleanup function to remove the map when the component unmounts
            map.setTarget();
        };
    }, [key]);

    return (
        <div className="container">
            <div className="col-2">
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
                        <p><strong>Coordinates:</strong> {selectedFeatureInfo.coordinates ? selectedFeatureInfo.coordinates.join(', ') : ""}</p>
                    </div>
                )}
            </div>
            <div className="col-6">
                <div id="map" style={{ width: '80vw', height: '80vh' }}>

                </div>
            </div>
        </div>
    );
}

export default MapRegion;
