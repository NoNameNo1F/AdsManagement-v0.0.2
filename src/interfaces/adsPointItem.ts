import { AdsType, LocationType } from "../enums";
import IDistrict from "./types/district";
import IWard from "./types/ward";

export default interface IAdsPointItem {
<<<<<<< Updated upstream
    id: number;
    address: string;
    locationType: LocationType;
    adsType: AdsType;
    adsPointImage: string;
    district: IDistrict;
    ward: IWard;
    lon: number;
    lat: number;
=======
    pointId: string;
    address: string;
    locationType: string;
    advertisingForm: string;
    images: [string];
    district: IDistrict;
    ward: IWard;
    coordinates: {
        longtitude: string,
        latitude: string
    }
>>>>>>> Stashed changes
    isPlanned: boolean;
    // adsBoards: AdsBoardItem[] | null;
    numberOfBoards: number;
};