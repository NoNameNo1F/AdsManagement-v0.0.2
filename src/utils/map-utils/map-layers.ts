import { GeoJSON } from "ol/format";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { TileJSON } from "ol/source";
import VectorSource from "ol/source/Vector";
import { Icon, Style } from "ol/style";
import { fetchFeatures } from "../../components/page/map/axios";
import { MAPTILER_BASE_LAYER_URL, MAPTILER_VECTOR_SOURCE_URL } from "../../constants/thirdPartyUrls";

export const getBaseLayer = (key: string) => {
    return new TileLayer({
        source: new TileJSON({
            url: `${MAPTILER_BASE_LAYER_URL}?key=${key}`,
            tileSize: 512,
            crossOrigin: 'anonymous'
        }),
    });
};

export const getUpperBaseLayer = (key: string) => {
    return new VectorLayer({
        source: new VectorSource({
<<<<<<< Updated upstream
            url: `https://api.maptiler.com/data/5dd8ce8b-d67c-44b8-9052-f58aa9f71427/features.json?key=${key}`,
            format: new GeoJSON(),
            loader: async function (extent, resolution, projection) {
                const url = `https://api.maptiler.com/data/5dd8ce8b-d67c-44b8-9052-f58aa9f71427/features.json?key=${key}`;
=======
            url: `${MAPTILER_VECTOR_SOURCE_URL}?key=${key}`,
            format: new GeoJSON(),
            loader: async function (extent, resolution, projection) {
                const url = `${MAPTILER_VECTOR_SOURCE_URL}?key=${key}`;
>>>>>>> Stashed changes
                const features: any = await fetchFeatures(url);
                (this as unknown as VectorSource).addFeatures(features);
            }
        }),
    });
};

export const setMarkerLayer = (source: VectorSource) => {
    return new VectorLayer({
        source: source,
        style: new Style({
            image: new Icon({
                src: "/assets/images/marker-icon.png",
                scale: 1,
                anchor: [0.5, 1],
            }),
        }),
    });
};
