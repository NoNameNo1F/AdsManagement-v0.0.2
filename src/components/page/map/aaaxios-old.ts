// import axios from "axios";
// import { GeoJSON } from "ol/format";
// import { FeatureObject } from "ol/format/Feature";

// import { IFeatureCollection } from "../../../interfaces";

// const fetchAdsPoints = async ()=> {
//     const response = await axios.get('http://localhost:5000/api/geojson');
//     const geojson: IFeatureCollection = {
//         type: "FeatureCollection",
//         features: response.data
//     }
//     if (geojson) {
//         return geojson;
//     } else {
//         throw new Error("Invalid GeoJSON data format [11_axios]: ");
//     }
// };

// const saveAdsPoints = async (data: FeatureObject) => {
//     try {
//         const response = await axios.post('http://localhost:5000/api/geojson', data);
//         console.log('Data successfully saved:', data);
//         return response.data
//     } catch (error) {
//         console.error('Error saving data:', error);
//         throw error;
//     }
// };

// const fetchFeatures = async (url: string) => {
//     try {
//         const response = await axios.get(url);
//         const data = response.data;
//         const filteredFeatures = data.features.filter((feature: any) => {
//             const name = feature.properties.text;
//             const type = feature.geometry.type;
//             return name && (type === 'Polygon');
//             // return name && (type === 'Polygon' && feature.id == "40fd2541-2da0-46c1-be37-1d73877b82d9");
//         });

//         const geojson = {
//             type: 'FeatureCollection',
//             features: filteredFeatures
//         };
//         const format = new GeoJSON();
//         const features = format.readFeatures(geojson, {
//             featureProjection: "EPSG:3857",
//         });
//         return features;
//     } catch (error) {
//         console.error('Error saving data:', error);
//         throw error;
//     }
// };

// const loadAdsPoints = async () => {
//     try {
//         const geojsonData = await fetchAdsPoints();
//         if (geojsonData) {
//             const format = new GeoJSON();
//             const features = format.readFeatures(geojsonData, {
//                 featureProjection: "EPSG:4326"
//             });
//             return features;
//         } else {
//             throw new Error(`Invalid GeoJSON data format [117_useEffect_LoadAdsPoints]: ${geojsonData}`);
//         }
//     } catch (error) {
//         console.error("[120]Catching Error loading ads points: ", error);
//     }
// };

// export { fetchAdsPoints, saveAdsPoints, fetchFeatures, loadAdsPoints };