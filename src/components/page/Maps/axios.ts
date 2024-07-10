import axios from "axios";
import { Feature } from "ol";
import { FeatureObject } from "ol/format/Feature";
import { Geometry } from "ol/geom";

interface FeatureCollection {
    type: string | null;
    features: Feature[] | null;
};

const fetchAdsPoints = async ()=> {
    const response = await axios.get('http://localhost:5000/api/geojson');
    // const geojson = response.data;
    
    const geojson: FeatureCollection = {
        type: "FeatureCollection",
        features: response.data
    }
    if (geojson) {
        return geojson;
    } else {
        throw new Error("Invalid GeoJSON data format [11_axios]: ",geojson);
    }
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


export { fetchAdsPoints, saveAdsPoints };