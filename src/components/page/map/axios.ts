import axios from "axios";
import { GeoJSON } from "ol/format";
import { FeatureObject } from "ol/format/Feature";
import { IAdsPointItem } from "../../../interfaces";
import IApiResponse from "../../../interfaces/apiResponse";
import { ADS_POINT_API } from "../../../constants/baseUrls";

const fetchAdsPoints = async ()=> {
    const response : IApiResponse = await axios.get(ADS_POINT_API);
    const adsPoints = response.data?.result!; 

    console.log(adsPoints);

    const featureObj: any = [];
    const features = adsPoints.map((adsPoint: IAdsPointItem) => {
        if (!adsPoint.coordinates.longtitude || !adsPoint.coordinates.latitude) {
            console.warn("Invalid coordinates found for:", adsPoint);
            return null;  // Skip invalid points
        }
        const feature = {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [
                    parseFloat(adsPoint.coordinates.longtitude),
                    parseFloat(adsPoint.coordinates.latitude)
                ]
            },
            properties: {
                text: adsPoint.address
            },
            id: adsPoint.pointId
        }
        featureObj.push(feature);
    })

    const format = new GeoJSON();
    const ft = format.readFeatures(
        {
            type: "FeatureCollection",
            features: featureObj
        },
        {
            featureProjection: "EPSG:3857"
        })
    return ft;
};

const saveAdsPoints = async (data: FeatureObject) => {
    try {
        const response = await axios.post('http://localhost:5000/api/geojson', data);
        console.log('Data successfully saved:', data);
        return response.data
    } catch (error) {
        console.error('Error saving data:', error);
        throw error;
    }
};

const fetchFeatures = async (url: string) => {
    try {
        const response = await axios.get(url);
        const data = response.data;
        console.log(data)
        const filteredFeatures = data.features.filter((feature: any) => {
            const name = feature.properties.text;
            const type = feature.geometry.type;
            return name && (type === 'Polygon');
        });

        const geojson = {
            type: 'FeatureCollection',
            features: filteredFeatures
        };
        const format = new GeoJSON();
        const features = format.readFeatures(geojson, {
            featureProjection: "EPSG:3857",
        });
        return features;
    } catch (error) {
        console.error('Error saving data:', error);
        throw error;
    }
};

const loadAdsPoints = async () => {
    try {
        const geojsonData = await fetchAdsPoints();
        if (geojsonData) {
            const format = new GeoJSON();
            const features = format.readFeatures(geojsonData, {
                featureProjection: "EPSG:4326"
            });
            return features;
        } else {
            throw new Error(`Invalid GeoJSON data format [117_useEffect_LoadAdsPoints]: ${geojsonData}`);
        }
    } catch (error) {
        console.error("[120]Catching Error loading ads points: ", error);
    }
};

export { fetchAdsPoints, saveAdsPoints, fetchFeatures, loadAdsPoints };