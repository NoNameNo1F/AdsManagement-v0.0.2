const HTTP_URL = import.meta.env.VITE_HTTP_URL;
const HTTPS_URL = import.meta.env.VITE_HTTPS_URL;

const API = HTTPS_URL + "api/";
export const API_V1 = API + "v1/";

export const AUTH_API = API_V1 + "auth";
export const ADS_POINT_API = API_V1 + "advertisement/point";
export const ADS_BOARD_API = API_V1 + "advertisement/board";