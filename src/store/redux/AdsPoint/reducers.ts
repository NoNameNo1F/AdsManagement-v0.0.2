import { IAdsBoardItem, IAdsPointItem } from "../../../interfaces";
import * as actionTypes from "./actionTypes";
import { selectAdsPoint } from "./actions";
interface AdsState {
    adsTitle: string;
    adsPointsList: IAdsPointItem[];
    adsBoardsList: IAdsBoardItem[];
    selectedAdsPointItem: IAdsPointItem | null;
    selectedAdsBoardItem: IAdsBoardItem | null;
    showAds: boolean;
}

// const initialState: AdsState = {
//     adsTitle: "",
//     adsPointsList: [],
//     adsBoardsList: [],
//     selectedAdsPointItem: null,
//     showAds: false,
// };
const initialState: AdsState = {
    adsTitle: "",
    adsPointsList: [
        {
            PointId: "1231412",
            Address: "123 Main St, District 1",
            LocationType: "BUS_STOP",
            AdvertisingForm: "POLITICAL_PROMOTION",
            Images: ["image1.jpg"],
            District: { id: 1, name: "District 1" },
            Ward: { id: 101, name: "Ward 101" },
            Coordinates: {
                Longtitude: "106.6958",
                Latitude: "10.7626"
            },
            IsPlanned: true,
            NumberOfBoards: 3,
        },
        {
            PointId: "1231412",
            Address: "123 Main St, District 1",
            LocationType: "BUS_STOP",
            AdvertisingForm: "POLITICAL_PROMOTION",
            Images: ["image1.jpg"],
            District: { id: 1, name: "District 1" },
            Ward: { id: 101, name: "Ward 101" },
            Coordinates: {
                Longtitude: "106.6958",
                Latitude: "10.7626"
            },
            IsPlanned: true,
            NumberOfBoards: 3,
        },
        {
            PointId: "1231412",
            Address: "123 Main St, District 1",
            LocationType: "BUS_STOP",
            AdvertisingForm: "POLITICAL_PROMOTION",
            Images: ["image1.jpg"],
            District: { id: 1, name: "District 1" },
            Ward: { id: 101, name: "Ward 101" },
            Coordinates: {
                Longtitude: "106.6958",
                Latitude: "10.7626"
            },
            IsPlanned: true,
            NumberOfBoards: 3,
        },
        {
            PointId: "1231412",
            Address: "123 Main St, District 1",
            LocationType: "BUS_STOP",
            AdvertisingForm: "POLITICAL_PROMOTION",
            Images: ["image1.jpg"],
            District: { id: 1, name: "District 1" },
            Ward: { id: 101, name: "Ward 101" },
            Coordinates: {
                Longtitude: "106.6958",
                Latitude: "10.7626"
            },
            IsPlanned: true,
            NumberOfBoards: 3,
        },
        {
            PointId: "1231412",
            Address: "123 Main St, District 1",
            LocationType: "BUS_STOP",
            AdvertisingForm: "POLITICAL_PROMOTION",
            Images: ["image1.jpg"],
            District: { id: 1, name: "District 1" },
            Ward: { id: 101, name: "Ward 101" },
            Coordinates: {
                Longtitude: "106.6958",
                Latitude: "10.7626"
            },
            IsPlanned: true,
            NumberOfBoards: 3,
        },
        {
            PointId: "1231412",
            Address: "123 Main St, District 1",
            LocationType: "BUS_STOP",
            AdvertisingForm: "POLITICAL_PROMOTION",
            Images: ["image1.jpg"],
            District: { id: 1, name: "District 1" },
            Ward: { id: 101, name: "Ward 101" },
            Coordinates: {
                Longtitude: "106.6958",
                Latitude: "10.7626"
            },
            IsPlanned: true,
            NumberOfBoards: 3,
        },
        {
            PointId: "1231412",
            Address: "123 Main St, District 1",
            LocationType: "BUS_STOP",
            AdvertisingForm: "POLITICAL_PROMOTION",
            Images: ["image1.jpg"],
            District: { id: 1, name: "District 1" },
            Ward: { id: 101, name: "Ward 101" },
            Coordinates: {
                Longtitude: "106.6958",
                Latitude: "10.7626"
            },
            IsPlanned: true,
            NumberOfBoards: 3,
        },
    ],
    adsBoardsList: [
        {
            Id: "1",
            AdsPoint: {
                PointId: "1231412",
                Address: "123 Main St, District 1",
                LocationType: "BUS_STOP",
                AdvertisingForm: "POLITICAL_PROMOTION",
                Images: ["image1.jpg"],
                District: { id: 1, name: "District 1" },
                Ward: { id: 101, name: "Ward 101" },
                Coordinates: {
                    Longtitude: "106.6958",
                    Latitude: "10.7626"
                },
                IsPlanned: true,
                NumberOfBoards: 3,
            },
            AdsBoardType: "HIFLEX_BILLBOARD_STAND",
            Size: "1.2x2m",
            Quantity: 1,
            Image: "zzz",
            ExpiredDate: "2022-01-01",
            CompanyContact: {
                Id: "1",
                Name: "Cuu toi",
                Email: "qkD5w@example.com",
                Phone: "0123456789",
                Address: "dasbgbasdjcnasnlasnlfnsalk"
            }
        },
        {
            Id: "1",
            AdsPoint: {
                PointId: "1231412",
                Address: "123 Main St, District 1",
                LocationType: "BUS_STOP",
                AdvertisingForm: "POLITICAL_PROMOTION",
                Images: ["image1.jpg"],
                District: { id: 1, name: "District 1" },
                Ward: { id: 101, name: "Ward 101" },
                Coordinates: {
                    Longtitude: "106.6958",
                    Latitude: "10.7626"
                },
                IsPlanned: true,
                NumberOfBoards: 3,
            },
            AdsBoardType: "HIFLEX_BILLBOARD_STAND",
            Size: "1.2x2m",
            Quantity: 1,
            Image: "zzz",
            ExpiredDate: "2022-01-01",
            CompanyContact: {
                Id: "1",
                Name: "Cuu toi",
                Email: "qkD5w@example.com",
                Phone: "0123456789",
                Address: "dasbgbasdjcnasnlasnlfnsalk"
            }
        },
        {
            Id: "1",
            AdsPoint: {
                PointId: "1231412",
                Address: "123 Main St, District 1",
                LocationType: "BUS_STOP",
                AdvertisingForm: "POLITICAL_PROMOTION",
                Images: ["image1.jpg"],
                District: { id: 1, name: "District 1" },
                Ward: { id: 101, name: "Ward 101" },
                Coordinates: {
                    Longtitude: "106.6958",
                    Latitude: "10.7626"
                },
                IsPlanned: true,
                NumberOfBoards: 3,
            },
            AdsBoardType: "HIFLEX_BILLBOARD_STAND",
            Size: "1.2x2m",
            Quantity: 1,
            Image: "zzz",
            ExpiredDate: "2022-01-01",
            CompanyContact: {
                Id: "1",
                Name: "Cuu toi",
                Email: "qkD5w@example.com",
                Phone: "0123456789",
                Address: "dasbgbasdjcnasnlasnlfnsalk"
            }
        },
        {
            Id: "1",
            AdsPoint: {
                PointId: "1231412",
                Address: "123 Main St, District 1",
                LocationType: "BUS_STOP",
                AdvertisingForm: "POLITICAL_PROMOTION",
                Images: ["image1.jpg"],
                District: { id: 1, name: "District 1" },
                Ward: { id: 101, name: "Ward 101" },
                Coordinates: {
                    Longtitude: "106.6958",
                    Latitude: "10.7626"
                },
                IsPlanned: true,
                NumberOfBoards: 3,
            },
            AdsBoardType: "HIFLEX_BILLBOARD_STAND",
            Size: "1.2x2m",
            Quantity: 1,
            Image: "zzz",
            ExpiredDate: "2022-01-01",
            CompanyContact: {
                Id: "1",
                Name: "Cuu toi",
                Email: "qkD5w@example.com",
                Phone: "0123456789",
                Address: "dasbgbasdjcnasnlasnlfnsalk"
            }
        },
        {
            Id: "1",
            AdsPoint: {
                PointId: "1231412",
                Address: "123 Main St, District 1",
                LocationType: "BUS_STOP",
                AdvertisingForm: "POLITICAL_PROMOTION",
                Images: ["image1.jpg"],
                District: { id: 1, name: "District 1" },
                Ward: { id: 101, name: "Ward 101" },
                Coordinates: {
                    Longtitude: "106.6958",
                    Latitude: "10.7626"
                },
                IsPlanned: true,
                NumberOfBoards: 3,
            },
            AdsBoardType: "HIFLEX_BILLBOARD_STAND",
            Size: "1.2x2m",
            Quantity: 1,
            Image: "zzz",
            ExpiredDate: "2022-01-01",
            CompanyContact: {
                Id: "1",
                Name: "Cuu toi",
                Email: "qkD5w@example.com",
                Phone: "0123456789",
                Address: "dasbgbasdjcnasnlasnlfnsalk"
            }
        },
    ],
    selectedAdsPointItem: null,
    selectedAdsBoardItem: null,
    showAds: false,
}

const adsReducer = (state: AdsState = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.HANDLE_ADS_CONTAINER:
            return {
                ...state,
                showAds: !state.showAds,
                adsTitle: state.selectedAdsPointItem ? state.selectedAdsPointItem.Address : "Ads Points List"
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
        default:
            return state;
    }
};

export default adsReducer;