import React, { useEffect, useRef, useState } from 'react';
import { Feature, Tile, Map, View, Collection } from 'ol';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Geometry, Point } from 'ol/geom';
import { GeoJSON } from 'ol/format';
import { TileJSON, XYZ, Cluster } from 'ol/source';
import { Style, Icon, Circle as CircleStyle, Fill, Stroke, Text } from 'ol/style';
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
import axios from "axios";

import { fetchAdsPoints, saveAdsPoints, loadAdsPoints } from './axios';
import { v4 as uuid } from 'uuid';
import { load } from 'ol/Image';
// import toastNotify from '../../../helpers/toastNotify';
import { Coordinate } from 'ol/coordinate';
import "./MapDisplay.css";
import { clearTimeout } from 'timers';
import { AdsContainer, AdsPointsList } from '../adspoint';
import { ISelectedFeatureInfo } from '../../../interfaces';
import { getAdsPointLayerStyle, getBaseLayer, getClusterLayerStyle, getUpperBaseLayer, getUpperBaseLayerStyle, mapHoverInteraction, mapDrawPointInteraction, mapSelectInteraction } from "../../../utils/map-utils";
import toastNotify from '../../../utils/toastNotify';
import { ModalAdsBoardItemDetail } from '../adsboard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/redux/store';

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

const MapDisplay: React.FC = () => {
    const key = import.meta.env.VITE_MAP_API;
    const distpatch = useDispatch();
    const adsBoardDisplay = useSelector((state: RootState) => state.adsPoint.selectedAdsBoardItem);
    const [selectedFeatureInfo, setSelectedFeatureInfo] = useState<ISelectedFeatureInfo | null>(null);
    const [drawInteraction, setDrawInteraction] = useState(new Draw({ type: 'Point' }));

    const [isDrawEnabled, setIsDrawEnabled] = useState(false);
    const mapRef = useRef<Map | null>(null);

    const [markerSource] = useState(new VectorSource());
    const [displayAdsPointList, setDisplayAdsPointList] = useState<boolean>(false);

    //Map Layers
    //1
    const baseLayer = getBaseLayer(key);
    //2
    const upperBaseLayerStyle = getUpperBaseLayerStyle();
    const upperBaseLayer = getUpperBaseLayer(key);
    upperBaseLayer.setStyle(upperBaseLayerStyle);
    //3
    const adsPointsSource = new VectorSource({
        format: new GeoJSON(),
        loader: async function (extent, resolution, projection) {
            // const features: any = await loadAdsPoints();
            const features: any = await fetchAdsPoints();
            (this as unknown as VectorSource).addFeatures(features);
        }
    });
    console.log(adsPointsSource);
    console.log(adsPointsSource.getFeatures());
    const clusterSource = new Cluster({
        distance: 50,
        source: adsPointsSource,
    });
    const clusterLayer = new VectorLayer({
        source: clusterSource,
        style: (feature) => getClusterLayerStyle(feature),
    });

    useEffect(() => {
        // 1. Fetching the all features in the mongodb
        // loadAdsPoints();
        const adsPointsLayer = new VectorLayer({
            source: adsPointsSource,
            style: getAdsPointLayerStyle,
        });
        const map = new Map({
            target: "map",
            layers: [
                baseLayer,
                upperBaseLayer,
                clusterLayer
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

        mapHoverInteraction(map, markerSource, setSelectedFeatureInfo, showPopUp, closePopUp);

        const select = new Select({
            condition: click,
        });
        mapSelectInteraction(select, map, markerSource, setSelectedFeatureInfo, showPopUp, closePopUp, setDisplayAdsPointList);

        const draw = new Draw({
            source: adsPointsSource,
            type: 'Point',
            condition: altKeyOnly || click,
        });
        setDrawInteraction(draw);
        // mapDrawPointInteraction(draw, map, adsPointsSource);
        // mapDrawPointInteraction(map, adsPointsSource, drawInteraction, setDrawInteraction);
        return () => {
            map.setTarget();
        };
    }, []);

    const showPopUp = (coords: Coordinate) => {
        const popUp = document.getElementById('custom-popup');
        if (popUp) {
            const [x, y] = mapRef.current?.getPixelFromCoordinate(coords) || [0, 0];
            popUp.style.display = 'block';
            popUp.style.left = `${x}px`;
            popUp.style.top = `${y}px`;
        }
    };

    const closePopUp = () => {
        const popUp = document.getElementById('custom-popup');
        if (popUp) {
            popUp.style.display = 'none';
        }
    };

    const toggleDrawInteraction = () => {
        if (!mapRef.current || !drawInteraction) {
            return;
        }

        if (isDrawEnabled) {
            mapRef.current.removeInteraction(drawInteraction);
            toastNotify("Drawing disabled", "warning");
        } else {
            mapDrawPointInteraction(mapRef.current, adsPointsSource, drawInteraction);
            toastNotify("Drawing enabled", "success");
        }
        setIsDrawEnabled(!isDrawEnabled);
    };
    return (
        <div className="map-container" id="map">
            <div className="search-container">
                <i className="bi bi-search"></i>
                <input className="search-input" placeholder="Tìm kiếm theo địa chỉ" id="search-input" />
            </div>
            <div id="custom-popup">
                <span className="ads-popup-title">Feature Information</span>
                <p><strong>Type:</strong> {selectedFeatureInfo?.name || 'N/A'}</p>
                <p><strong>Coordinates:</strong> {selectedFeatureInfo?.coordinates?.join(', ') || 'N/A'}</p>
                <button className="ads-popup-button" onClick={closePopUp}>Close</button>
            </div>
            {adsBoardDisplay && (
                <ModalAdsBoardItemDetail />
            )}

            <AdsContainer />
            <button onClick={toggleDrawInteraction} className="position-absolute bottom-50 z-1">
                {isDrawEnabled ? 'Disable Drawing' : 'Enable Drawing'}
            </button>
        </div>
    );
};

export default MapDisplay;

