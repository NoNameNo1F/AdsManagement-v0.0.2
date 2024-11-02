import { IAdsBoardItem, IAdsPointItem } from "../../../interfaces";
import * as actionTypes from "./actionTypes";

export const handleAdsContainer = (state: boolean) => {
    return {
        type: actionTypes.HANDLE_ADS_CONTAINER,
        payload: state
    }
};

export const selectAdsPoint = (adsPoint: IAdsPointItem | null) => {
    return {
        type: actionTypes.SELECT_ADS_POINT,
        payload: adsPoint
    }
};

export const selectAdsBoard = (adsBoard: IAdsBoardItem | null) => {
    return {
        type: actionTypes.SELECT_ADS_BOARD,
        payload: adsBoard
    }
};

export const fetchAdsPoints = (adsPointsList: IAdsPointItem[]) => {
    return {
        type: actionTypes.FETCH_ADS_POINTS,
        payload: adsPointsList
    }
};

export const fetchAdsBoards = (listItem: IAdsBoardItem[]) => {
    return {
        type: actionTypes.FETCH_ADS_BOARDS,
        payload: listItem
    }
};