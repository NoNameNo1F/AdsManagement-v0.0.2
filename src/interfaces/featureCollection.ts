import { Feature } from "ol";

export default interface IFeatureCollection {
    type: string | null;
    features: Feature[] | null;
};