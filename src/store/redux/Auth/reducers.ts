import { IUserAuth } from "../../../interfaces";

import * as actionTypes from "./actionTypes"

interface AuthState {
    isAuthenticated: boolean;
    user: IUserAuth | null;
};

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
};

const authReducer = (state: AuthState = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.SET_USER_CREDENTIALS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            };
        case actionTypes.REMOVE_USER_CREDENTIALS:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }
        default:
            return state;
    }
};

export default authReducer;