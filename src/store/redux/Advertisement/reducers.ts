import { IAdsBoardItem, IAdsPointItem } from "../../../interfaces";
import * as actionTypes from "./actionTypes";

interface AdsState {
    adsTitle: string;
    showAds: boolean;
    showPopup: boolean;
    adsPointsList: IAdsPointItem[];
    adsBoardsList: IAdsBoardItem[];
    selectedAdsPointItem: IAdsPointItem | null;
    selectedAdsBoardItem: IAdsBoardItem | null;
}

const initialState: AdsState = {
    adsTitle: "",
    showAds: false,
    showPopup: false,
    adsBoardsList: [],
    adsPointsList: [],
    selectedAdsPointItem: null,
    selectedAdsBoardItem: null,
}

const advertisementReducer = (state: AdsState = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.HANDLE_ADS_CONTAINER:
            return {
                ...state,
                showAds: !state.showAds,
                adsTitle: state.selectedAdsPointItem ? state.selectedAdsPointItem.address : "Ads Points List"
            };
        case actionTypes.SELECT_ADS_POINT:
            return {
                ...state,
                selectedAdsPointItem: action.payload,
                adsTitle: action.payload != null ? action.payload.address : "Ads Points List"
            };
        case actionTypes.SELECT_ADS_BOARD:
            return {
                ...state,
                selectedAdsBoardItem: action.payload,
                adsTitle: "Ads Board Detail"
            };
        case actionTypes.FETCH_ADS_POINTS:
            return {
                ...state,
                adsPointsList: action.payload,
            };
        case actionTypes.FETCH_ADS_BOARDS:
            return {
                ...state,
                adsBoardsList: action.payload,
            };
        default:
            return state;
    }
};

export default advertisementReducer;