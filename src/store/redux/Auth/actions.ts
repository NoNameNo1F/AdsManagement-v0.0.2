import IUserAuth from "../../../interfaces/userAuth";

import * as actionTypes from "./actionTypes";
export const setUserCredentials = ( userSession: IUserAuth) => {
    return {
        type: actionTypes.SET_USER_CREDENTIALS,
        payload: userSession
    }
};

export const logout = () => {
    return {
        type: actionTypes.REMOVE_USER_CREDENTIALS
    }
}