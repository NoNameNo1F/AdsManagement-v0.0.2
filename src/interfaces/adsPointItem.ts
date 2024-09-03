import { AdsType, LocationType } from "../enums";
import IDistrict from "./types/district";
import IWard from "./types/ward";

export default interface IAdsPointItem {
    id: number;
    address: string;
    locationType: LocationType;
    adsType: AdsType;
    adsPointImage: string;
    district: IDistrict;
    ward: IWard;
    lon: number;
    lat: number;
    isPlanned: boolean;
    // adsBoards: AdsBoardItem[] | null;
    numberOfBoards: number;
};