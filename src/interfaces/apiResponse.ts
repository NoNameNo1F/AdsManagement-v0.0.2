import IAdsPointItem from "./adsPointItem";

export default interface IApiResponse {
    data?: {
        statusCode?: number;
        isSuccess?: boolean;
        errors?: Array<string>;
        result?: any;
    };
    error?: any;
}