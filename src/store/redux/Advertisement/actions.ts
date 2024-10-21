import { Dispatch } from "redux";
import { IAdsBoardItem, IAdsPointItem } from "../../../interfaces";
import * as actionTypes from "./actionTypes";
import axios from "axios";
import IApiResponse from "../../../interfaces/apiResponse";
import { ADS_POINT_API } from "../../../constants/baseUrls";

export const handleAdsContainer = (state: boolean) => {
    return {
        type: actionTypes.HANDLE_ADS_CONTAINER,
        payload: state
    }
};

export const selectAdsPoint = (item: IAdsPointItem | null) => {
    return {
        type: actionTypes.SELECT_ADS_POINT,
        payload: item
    }
};

export const selectAdsBoard = (item: IAdsBoardItem | null) => {
    return {
        type: actionTypes.SELECT_ADS_BOARD,
        payload: item
    }
};

export const setAdsPoints = (listItem: IAdsPointItem[]) => {
    return {
        type: actionTypes.SET_ADS_POINTS,
        payload: listItem
    }
};

export const setAdsBoards = (listItem: IAdsBoardItem[]) => {
    return {
        type: actionTypes.SET_ADS_BOARDS,
        payload: listItem
    }
};

export const fetchAdsPoints = () => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: actionTypes.FETCH_ADS_POINTS_REQUEST });
        
        try {
            const response: IApiResponse = await axios.get(ADS_POINT_API);
            if (response.data?.isSuccess !== true) {
                dispatch({
                    type: actionTypes.FETCH_ADS_POINTS_FAILURE,
                    payload: response.error
                });
            }
            const adsPoints = response.data?.result!;

            dispatch({
                type: actionTypes.FETCH_ADS_POINTS_SUCCESS,
                payload: adsPoints
            });
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_ADS_POINTS_FAILURE,
                payload: error
            });
        }
    };
};