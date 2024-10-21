import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_V1 } from "../constants/baseUrls";

const advertisementApi = createApi({
    reducerPath: "advertisementApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_V1
    }),
    tagTypes: ["adsPoints"],
    endpoints: (builder) => ({
        getAdsPoints: builder.query({
            query: () => ({
                url: "adsvertisement/point",
                method: "GET",
            }),
            providesTags: ["adsPoints"],
        }),
        getAdsPointById: builder.query({
            query: (pointId: string) => ({
                url: `adsvertisement/point/${pointId}`,
                method: "GET",
            }),
            providesTags: ["adsPoints"],
        }),
        getAdsBoardsByPointId: builder.query({
            query: (adsPointId: string) => ({
                url: `adsvertisement/board/${adsPointId}`,
                method: "GET",
            }),
        })
    }),
});

export const {
    useGetAdsPointsQuery,
    useGetAdsPointByIdQuery,
    useGetAdsBoardsByPointIdQuery} = advertisementApi;
export default advertisementApi;