import * as actionTypes from "./actionTypes";
interface MapState {
    areas: any | null;
}

const initialState: MapState = {
    areas: null,
}

const mapReducer = (state: MapState = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.SELECT_AREA:
            return {
                ...state,
            };
        case actionTypes.SET_MAP_AREA:
            return {
                ...state,
                areas: action.payload,
            };
        default:
            return state;
    }
};

export default mapReducer;