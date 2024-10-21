import { IAdsBoardItem, IAdsPointItem } from "../../../interfaces";
import * as actionTypes from "./actionTypes";
import { selectAdsPoint } from "./actions";
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
    adsBoardsList: [

    ],
    adsPointsList: [
        {
            pointId: "1231412",
            address: "123 Main St, District 1",
            locationType: "BUS_STOP",
            advertisingForm: "POLITICAL_PROMOTION",
            images: ["image1.jpg"],
            district: { districtId: 1, districtName: "District 1" },
            ward: { wardId: 101, wardName: "Ward 101" },
            coordinates: {
                longtitude: "106.6958",
                latitude: "10.7626"
            },
            isPlanned: true,
            numberOfBoards: 3,
        },
        
    ],
    selectedAdsPointItem: null,
    selectedAdsBoardItem: null,
    showAds: false,
    showPopup: false,
}

const adsReducer = (state: AdsState = initialState, action: any) => {
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
                adsTitle: action.payload != null ? action.payload.Address : "Ads Points List"
            };
        case actionTypes.SELECT_ADS_BOARD:
            return {
                ...state,
                selectedAdsBoardItem: action.payload,
                adsTitle: "Ads Board Detail"
            };
        case actionTypes.SET_ADS_POINTS:
            return {
                ...state,
                adsPointsList: action.payload,
                selectedAdsPointItem: null,
                adsTitle: "Ads Points List"
            };
        case actionTypes.SET_ADS_BOARDS:
            return {
                ...state,
                adsBoardsList: action.payload,
            };
        case actionTypes.FETCH_ADS_POINTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.FETCH_ADS_POINTS_SUCCESS:
            return {
                ...state,
                loading: false,
                adsPointsList: action.payload,
                error: null,
            }
        case actionTypes.FETCH_ADS_POINTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
};

export default adsReducer;