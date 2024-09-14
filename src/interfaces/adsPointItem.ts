// import { EAdvertisingForm, LocationType } from "../enums";
import IDistrict from "./types/district";
import IWard from "./types/ward";

export default interface IAdsPointItem {
    PointId: string;
    Address: string;
    LocationType: string;
    AdvertisingForm: string;
    Images: [string];
    District: IDistrict;
    Ward: IWard;
    Coordinates: {
        Longtitude: string,
        Latitude: string
    }
    IsPlanned: boolean;
    // adsBoards: AdsBoardItem[] | null;
    NumberOfBoards: number;
};