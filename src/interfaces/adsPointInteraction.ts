import IAdsPointItem from "./adsPointItem";

export default interface IAdsPointInteraction {
    AdsPoint: IAdsPointItem | null;
    IsSelected: boolean;
    IsHovered: boolean;
};