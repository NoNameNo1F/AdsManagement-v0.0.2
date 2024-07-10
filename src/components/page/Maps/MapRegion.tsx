import React, { useEffect, useState } from 'react';
import { Feature, Tile, Map, View, Collection } from 'ol';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Geometry, Point } from 'ol/geom';
import { GeoJSON } from 'ol/format';
import { TileJSON, XYZ } from 'ol/source';
// import { getCoordinates } from 'ol/coordinate';
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
import { altKeyOnly, click, doubleClick, never, platformModifierKeyOnly, shiftKeyOnly } from 'ol/events/condition';

import { mapConfigs } from '../../../configurations/maps';

import axios from "axios";
import fs from "fs";
import path from 'path';
import { fetchAdsPoints, saveAdsPoints } from './axios';
import {v4 as uuid} from 'uuid';
import { load } from 'ol/Image';


interface SelectedFeatureInfo {
    name: string | null;
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

function MapRegion() {;
    const key = mapConfigs.api;

    const [selectedFeatureInfo, setSelectedFeatureInfo] = useState<SelectedFeatureInfo>({
        name: null,
        coordinates: null
    });

    // let adsPointsSource = new VectorSource();
    const [adsPointsSource] = useState(new VectorSource());
    // const [adsPointsLayer, setAdsPointsLayer] = useState(new VectorLayer({
    //     source: adsPointsSource,
    //     style: new Style({
    //         // stroke: new Stroke({
    //         //     color: 'rgba(28, 33, 203, 0.8)',
    //         // }),
    //         // fill: new Fill({
    //         //     color: 'rgba(234, 183, 120, 0.3)',
    //         // }),
    //         image: new CircleStyle({
    //             radius: 8,
    //             fill: new Fill({
    //                 color: 'rgba(21, 84, 220, 0.8)',
    //             }),
    //             stroke: new Stroke({
    //                 color: 'rgba(255, 255, 255, 0.8)',
    //                 width: 1
    //             }),
    //         }),
    //     }),
    // }));

    const [isDrawed, setIsDrawed] = useState<boolean>(false);
    
    /* So basically , the idea of its is fetching every drawed point that So
    VH-TT picking for ads, but this is quitely redundant cause it makes the
    call down to db everytime, make it slowly. So we just fetch it once, and
    everytime we draw, we firstly save then we will update the adsPointsSource
    to hold. It will become much more effiecient.  */
    
    
    const baseLayer = new TileLayer({
        source: new TileJSON({
            url: `https://api.maptiler.com/maps/openstreetmap/tiles.json?key=${key}`,
            tileSize: 512,
            crossOrigin: 'anonymous'
        }),
    });
    
    const upperBaseLayer = new VectorLayer({
        source: new VectorSource({
            url: `https://api.maptiler.com/data/5dd8ce8b-d67c-44b8-9052-f58aa9f71427/features.json?key=${key}`,
            format: new GeoJSON(),
            loader: function (extent, resolution, projection) {
                const url = `https://api.maptiler.com/data/5dd8ce8b-d67c-44b8-9052-f58aa9f71427/features.json?key=${key}`;
                axios.get(url)
                    .then(response => {
                        const data = response.data;
                        console.log("Fetching: ", data);
                        const filteredFeatures = data.features.filter((feature: any) => {
                            const name = feature.properties.text;
                            const type = feature.geometry.type;
                            return name && (type === 'Polygon' || type === 'Point');
                        });
                        
                        const geojson = {
                            type: 'FeatureCollection',
                            features: filteredFeatures
                        };
                        console.log("GeoJson: ", geojson);

                        const format = new GeoJSON();
                        const features = format.readFeatures(geojson, {
                            featureProjection: projection
                        });
                        console.log("Format: ", features);

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

    // const loadAdsPoints = () => {
    //     setTimeout(async () => {
    //         try {
    //             console.log("First Fetching Then Sleepy zzzzz");
    //             const geojsonData = await fetchAdsPoints();
                
    //             console.log(geojsonData);
                
    //             if (geojsonData) {
    //                 const format = new GeoJSON();
    //                 const features = format.readFeatures(geojsonData, {
    //                     featureProjection: "EPSG:3857"
    //                 });
    //                 // let featureList = [];
    //                 features.forEach((feature) => {
    //                     const existingFeature = adsPointsSource.getFeatureById(feature.getId()!);
    //                     if (existingFeature) {
    //                         adsPointsSource.addFeature(feature);
    //                         // featureList.push(feature);
    //                     } else {
    //                         console.warn(`Feature with ID ${feature.getId()} already exists`);
    //                     }
    //                 });
    //                 // adsPointsSource.addFeatures(features);
    //                 return adsPointsSource;
    //             } else {
    //                 throw new Error(`Invalid GeoJSON data format [117_useEffect_LoadAdsPoints]: ${geojsonData}`);
    //             }
    //         } catch (error) {
    //             console.error("[120]Catching Error loading ads points: ", error);
    //         }
    //     }, 2000);
    // };

    const loadAdsPoints = async () => {
        try {
            const geojsonData = await fetchAdsPoints();
            if (geojsonData) {
                const format = new GeoJSON();
                const features = format.readFeatures(geojsonData, {
                    // featureProjection: "EPSG:3857"
                    featureProjection: "EPSG:4326"
                });
                adsPointsSource.addFeatures(features);
            } else {
                throw new Error(`Invalid GeoJSON data format [117_useEffect_LoadAdsPoints]: ${geojsonData}`);
            }
        } catch (error) {
            console.error("[120]Catching Error loading ads points: ", error);
        }
    };

    // let adsPointsLayer = new VectorLayer({
    //     source: adsPointsSource,
    //     style: new Style({
    //         // stroke: new Stroke({
    //         //     color: 'rgba(28, 33, 203, 0.8)',
    //         // }),
    //         // fill: new Fill({
    //         //     color: 'rgba(234, 183, 120, 0.3)',
    //         // }),
    //         image: new CircleStyle({
    //             radius: 8,
    //             fill: new Fill({
    //                 color: 'rgba(21, 84, 220, 0.8)',
    //             }),
    //             stroke: new Stroke({
    //                 color: 'rgba(255, 255, 255, 0.8)',
    //                 width: 1
    //             }),
    //         }),
    //     }),
    // });

    useEffect(() => {
        // 1. Fetching the all features in the mongodb
        // const features = loadAdsPoints();
        // adsPointsSource.addFeatures(features);
        loadAdsPoints();
        const adsPointsLayer = new VectorLayer({
            source: adsPointsSource,
            style: new Style({
                // stroke: new Stroke({
                //     color: 'rgba(28, 33, 203, 0.8)',
                // }),
                // fill: new Fill({
                //     color: 'rgba(234, 183, 120, 0.3)',
                // }),
                image: new CircleStyle({
                    radius: 8,
                    fill: new Fill({
                        color: 'rgba(21, 84, 220, 0.8)',
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
                upperBaseLayer,
                adsPointsLayer,
            ],
            view: new View({
                center: fromLonLat([106.630076, 10.742332]),
                zoom: 15
            }),
            controls: defaultControls().extend([
                new ScaleLine(),
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
                console.log(geometry)
                if (geometry) {
                    if (geometry instanceof Point) {
                        const coords = geometry.getCoordinates();
                        const lonLat = toLonLat(coords);
                        setSelectedFeatureInfo({
                            name: selectedFeature.getProperties().text,
                            coordinates: lonLat
                        });
                    } else {
                        setSelectedFeatureInfo({
                            name: selectedFeature.getProperties().text,
                            coordinates: null
                        });
                    }
                }
            } else {
                setSelectedFeatureInfo({
                    name: null,
                    coordinates: null
                });
            }
        });
        
        const draw = new Draw({
            source: adsPointsSource,
            type: 'Point',
            condition: altKeyOnly || click,
        });

        map.addInteraction(draw);
        // draw.on("drawstart", (e) => {

        // })
        draw.on('drawend', async (event) => {
            console.log("1. adsPointLayer: ", adsPointsLayer.getSource()?.getFeatures());
            console.log("2. adsPointSource: ", adsPointsLayer.getSource());
            console.log("3. adsPointSource: ", upperBaseLayer.getSource());

            setIsDrawed(!isDrawed);

            let feature = event.feature;
            const format = new GeoJSON();
            feature.setProperties({
                text: "Ads point",
            });
            feature.setId(uuid());
            const newFeature = format.writeFeatureObject(feature);

            console.log("3. New feature created: ", newFeature);

            
            try {
                await saveAdsPoints(newFeature);
                adsPointsSource.addFeature(feature);
                console.log("4a. Features: ", adsPointsSource.getFeatures());
            } catch (error) {
                console.error("4b. Error saving ads points: ", error);
            }
        });
        
        return () => {
            map.setTarget();
        };
    }, []);

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
                        <p><strong>Type:</strong> {selectedFeatureInfo.name}</p>
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

