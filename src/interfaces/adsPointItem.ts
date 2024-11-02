import IDistrict from "./types/district";
import IWard from "./types/ward";

export default interface IAdsPointItem {
    pointId: string;
    address: string;
    locationType: string;
    advertisingForm: string;
    images: [string];
    district: IDistrict;
    ward: IWard;
    coordinates: {
        longtitude: string,
        latitude: string;
    };
    isPlanned: boolean;
    numberOfBoards: number;
};