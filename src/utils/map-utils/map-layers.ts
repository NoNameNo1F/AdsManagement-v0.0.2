import axios from "axios";
import { GeoJSON } from "ol/format";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { TileJSON } from "ol/source";
import VectorSource from "ol/source/Vector";
import { Icon, Style } from "ol/style";
import { fetchFeatures } from "../../components/page/map/axios";
import { set } from "ol/transform";

export const getBaseLayer = (key: string) => {
    return new TileLayer({
        source: new TileJSON({
            url: `https://api.maptiler.com/maps/openstreetmap/tiles.json?key=${key}`,
            tileSize: 512,
            crossOrigin: 'anonymous'
        }),
    });
};

export const getUpperBaseLayer = (key: string) => {
    return new VectorLayer({
        source: new VectorSource({
            url: `https://api.maptiler.com/data/2abfad35-6bae-49bc-88ca-3cb3015d8896/features.json?key=${key}`,
            format: new GeoJSON(),
            loader: async function (extent, resolution, projection) {
                const url = `https://api.maptiler.com/data/2abfad35-6bae-49bc-88ca-3cb3015d8896/features.json?key=${key}`;
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
