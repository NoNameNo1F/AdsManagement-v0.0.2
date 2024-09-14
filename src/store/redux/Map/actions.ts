import * as actionTypes from "./actionTypes";

export const selectArea = (area: string) => {
    return {
        type: actionTypes.SELECT_AREA,
        payload: area
    }
};

export const setMapArea = (features: any) => {
    return {
        type: actionTypes.SET_MAP_AREA,
        payload: features
    }
};