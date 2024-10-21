import { IUserAuth } from "../../../interfaces";
import * as actionTypes from "./actionTypes";

export const setUserCredentials = (token: string) => {
    return {
        type: actionTypes.SET_USER_CREDENTIALS,
        payload: token
    }
};

export const logout = () => {
    return {
        type: actionTypes.REMOVE_USER_CREDENTIALS
    }
}