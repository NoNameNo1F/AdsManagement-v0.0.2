import ISelectedFeatureInfo from "./selectedFeatureInfo";

export default interface ISelectedPointInfo extends ISelectedFeatureInfo {
    locationType: string | null,
    advertisingForm: string | null,
    isPlanned: boolean | null
}