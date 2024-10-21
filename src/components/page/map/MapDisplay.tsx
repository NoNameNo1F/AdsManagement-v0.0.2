import {
    defaults as defaultControls,
    ScaleLine,
    FullScreen,
    MousePosition,
    OverviewMap,
} from 'ol/control';

import {
    defaults as defaultInteractions,
    DragRotate,
    Draw,
    Select,
} from 'ol/interaction';

import {
    getBaseLayer,
    getClusterLayerStyle,
    getUpperBaseLayer,
    getUpperBaseLayerStyle,
    addMapClusterClickInteraction,
    addMapDrawPointInteraction,
    addMapHoverInteraction,
    addMapSelectInteraction
} from "../../../utils/map-utils";

import "./MapDisplay.css";
import VectorLayer from 'ol/layer/Vector';
import TileLayer from 'ol/layer/Tile';
import VectorSource from 'ol/source/Vector';
import toastNotify from '../../../utils/toastNotify';

import React, { useEffect, useRef, useState } from 'react';
import { Map, View } from 'ol';
import { fromLonLat, toLonLat } from 'ol/proj';
import { GeoJSON } from 'ol/format';
import { XYZ, Cluster } from 'ol/source';
import { altKeyOnly, click, shiftKeyOnly } from 'ol/events/condition';
import { fetchAdsPoints } from './axios';
import { Coordinate } from 'ol/coordinate';
import { AdsContainer } from '../adspoint';
import { ISelectedFeatureInfo, ISelectedPointInfo } from '../../../interfaces';
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
    const mapRef = useRef<Map | null>(null);

    const adsBoardDisplay = useSelector((state: RootState) => state.adsPoint.selectedAdsBoardItem);

    const [selectedFeatureInfo, setSelectedFeatureInfo] = useState<ISelectedFeatureInfo | null>(null);
    const [selectedPointInfo, setSelectedPointInfo] = useState<ISelectedPointInfo | null>(null);
    const [drawInteraction, setDrawInteraction] = useState(new Draw({ type: 'Point' }));
    const [displayAdsPointList, setDisplayAdsPointList] = useState<boolean>(false);
    const [isDrawEnabled, setIsDrawEnabled] = useState(false);
    const [markerSource] = useState(new VectorSource());


    const baseLayer = getBaseLayer(key);
    const upperBaseLayerStyle = getUpperBaseLayerStyle();
    const upperBaseLayer = getUpperBaseLayer(key);
    upperBaseLayer.setStyle(upperBaseLayerStyle);

    const adsPointsSource = new VectorSource({
        format: new GeoJSON(),
        loader: async function () {
            const features: any = await fetchAdsPoints();
            (this as unknown as VectorSource).addFeatures(features);
        }
    });

    const clusterSource = new Cluster({
        distance: 50,
        source: adsPointsSource,
    });
    const clusterLayer = new VectorLayer({
        source: clusterSource,
        style: (feature) => getClusterLayerStyle(feature),
    });

    useEffect(() => {
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
        const select = new Select({ condition: click });
        const draw = new Draw({
            source: adsPointsSource,
            type: 'Point',
            condition: altKeyOnly || click,
        });

        setDrawInteraction(draw);
        addMapClusterClickInteraction(map, clusterLayer);
        addMapHoverInteraction(map, markerSource, setSelectedPointInfo, showPopUp, closePopUp);
        addMapSelectInteraction(select, map, markerSource, setSelectedFeatureInfo, showPopUp, closePopUp, setDisplayAdsPointList);

        return () => {
            map.setTarget();
        };
    }, []);

    const showPopUp = (coords: Coordinate) => {
        const popUp = document.getElementById('custom-popup');
        if (popUp) {
            const [x, y] = mapRef.current?.getPixelFromCoordinate(coords) || [0, 0];
            popUp.style.display = 'block';
            popUp.style.left = `${x + 50}px`;
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
            addMapDrawPointInteraction(mapRef.current, adsPointsSource, drawInteraction);
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
                <h3 className="ads-popup-title">Feature Information</h3>
                <p><strong>{selectedPointInfo?.locationType || 'N/A Location'}</strong></p>
                <p>{selectedPointInfo?.name || 'N/A Address'}</p>
                <p>{selectedPointInfo?.advertisingForm || 'N/A Advertising Form'}</p>
                <p>
                    <strong>
                        {selectedPointInfo?.isPlanned ? <div className='text-success'>Planned</div> : <div className='text-danger'>Not Planned</div>}
                    </strong>
                </p>
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

