import { REMOVE_USER_CREDENTIALS, SET_USER_CREDENTIALS } from "./actionTypes";

export const setUserCredentials = (state: any) => {
    return {
        type: SET_USER_CREDENTIALS,
        payload: state
    }
};

export const logout = () => {
    return {
        type: REMOVE_USER_CREDENTIALS
    }
}