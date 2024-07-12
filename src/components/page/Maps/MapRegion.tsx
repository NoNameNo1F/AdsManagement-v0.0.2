import React, { useEffect, useRef, useState } from 'react';
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

// import { mapConfigs } from '../../../configurations/maps';

import axios from "axios";

import { fetchAdsPoints, saveAdsPoints } from './axios';
import {v4 as uuid} from 'uuid';
import { load } from 'ol/Image';
import toastNotify from '../../../helpers/toastNotify';


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
    const key = import.meta.env.VITE_MAP_API;

    const [selectedFeatureInfo, setSelectedFeatureInfo] = useState<SelectedFeatureInfo>({
        name: null,
        coordinates: null
    });
    // const [markerLayer] = useState(new VectorSource());
    const [drawInteraction, setDrawInteraction] = useState<Draw | null>(null);
    const [isDrawEnabled, setIsDrawEnabled] = useState(false);
    const mapRef = useRef<Map | null>(null);

    const [adsPointsSource] = useState(new VectorSource());
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

    useEffect(() => {
        // 1. Fetching the all features in the mongodb
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

        // 2. Create map
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

        mapRef.current = map;

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

        setDrawInteraction(draw);
        
        // map.addInteraction(draw);
        draw.on("drawstart", (event) => {
            console.log("Drawing started", event);
        });

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
    const toggleDrawInteraction = () => {
        const map = mapRef.current;
        if (drawInteraction) {
            if (isDrawEnabled) {
                map!.removeInteraction(drawInteraction);
                toastNotify("Drawing disabled", "success");
            } else {
                map!.addInteraction(drawInteraction);
                toastNotify("Drawing enabled", "success");
            }
            setIsDrawEnabled(!isDrawEnabled);
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-4">
                {/* The map will be rendered inside this div */}
                {selectedFeatureInfo && (
                    // <div className="" style={{
                    //     position: "absolute",
                    //     top: "10px",
                    //     left: "10px",
                    //     backgroundColor: "white",
                    //     padding: "10px",
                    // }}>
                    <div className="">
                        <p><strong>Type:</strong> {selectedFeatureInfo.name}</p>
                        <p><strong>Coordinates:</strong> {selectedFeatureInfo.coordinates ? selectedFeatureInfo.coordinates.join(', ') : ""}</p>
                    </div>
                )}
            </div>
            <div className="col-8">
                <div id="map" style={{ width: '60vw', height: '80vh' }}>

                </div>
                
                <button onClick={toggleDrawInteraction}>
                    {isDrawEnabled ? 'Disable Drawing' : 'Enable Drawing'}
                </button>
            </div>
        </div>
//         <div className="container">
//   <div className="row">
//     <div className="col-md-4">.col-md-4</div>
//     <div className="col-md-4 ms-auto">.col-md-4 .ms-auto</div>
//   </div>
//   <div className="row">
//     <div className="col-md-3 ms-md-auto">.col-md-3 .ms-md-auto</div>
//     <div className="col-md-3 ms-md-auto">.col-md-3 .ms-md-auto</div>
//   </div>
//   <div className="row">
//     <div className="col-auto me-auto">.col-auto .me-auto</div>
//     <div className="col-auto">.col-auto</div>
//   </div>
// </div>
    );
}

export default MapRegion;

