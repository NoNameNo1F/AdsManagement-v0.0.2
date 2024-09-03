import { IAdsBoardItem, IAdsPointItem } from "../../../interfaces";
import * as actionTypes from "./actionTypes";

export const handleAdsContainer = () => {
    return {
        type: actionTypes.HANDLE_ADS_CONTAINER
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

export const setAdsBoards = (listItem: IAdsPointItem[]) => {
    return {
        type: actionTypes.SET_ADS_BOARDS,
        payload: listItem
    }
};