import axios from "axios";
import { GeoJSON } from "ol/format";
import { IAdsPointItem } from "../../../interfaces";
const formatAdsPoint = async (adsPointsList: IAdsPointItem[]) => {
    if (!adsPointsList || adsPointsList.length === 0) {
        console.warn("adsPointsQuery is empty or undefined.");
        return [];
    }
    
    const featureObj: any = [];
    adsPointsList.forEach((adsPoint: IAdsPointItem) => {
        if (!adsPoint.coordinates.longtitude || !adsPoint.coordinates.latitude) {
            console.warn("Invalid coordinates found for:", adsPoint);
            return;
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
                address: adsPoint.address,
                isPlanned: adsPoint.isPlanned,
                locationType: adsPoint.locationType,
                advertisingForm: adsPoint.advertisingForm,
                district: adsPoint.district,
                ward: adsPoint.ward,
            },
            id: adsPoint.pointId
        }
        featureObj.push(feature);
    })

    const format = new GeoJSON();
    const features = format.readFeatures(
    {
        type: "FeatureCollection",
        features: featureObj
    },
    {
        featureProjection: "EPSG:3857"
        })
    return features;
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

export { formatAdsPoint, fetchFeatures };