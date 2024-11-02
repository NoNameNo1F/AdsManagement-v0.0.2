import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ADS_BOARD_API, ADS_POINT_API } from "../constants/baseUrls";
import IApiResponse from "../interfaces/apiResponse";

const advertisementApi = createApi({
    reducerPath: "advertisementApi",
    baseQuery: fetchBaseQuery({
        baseUrl: ""
    }),
    tagTypes: ["adsPoints"],
    endpoints: (builder) => ({
        getAdsPoints: builder.query({
            query: () => ({
                url: ADS_POINT_API,
                method: "GET",
            }),
            transformResponse: (response: IApiResponse["data"]) => {
                return response?.result;
            },
            providesTags: ["adsPoints"],
        }),
        getAdsPointById: builder.query({
            query: (pointId: string) => ({
                url: `${ADS_POINT_API}/${pointId}`,
                method: "GET",
            }),
            transformResponse: (response: IApiResponse) => response.data?.result,
            providesTags: ["adsPoints"],
        }),
        getAdsBoardsByPointId: builder.query({
            query: (adsPointId: string) => ({
                url: `${ADS_BOARD_API}/${adsPointId}`,
                method: "GET",
            }),
            transformResponse: (response: IApiResponse) => response.data?.result,
        })
    }),
});

export const {
    useGetAdsPointsQuery,
    useGetAdsPointByIdQuery,
    useGetAdsBoardsByPointIdQuery} = advertisementApi;
export default advertisementApi;