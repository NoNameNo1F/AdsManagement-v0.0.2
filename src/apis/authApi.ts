import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AUTH_API } from "../constants/baseUrls";

const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: AUTH_API,
    }),
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (userCredentials: any) => ({
                url: "/login",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: userCredentials,
            })
        }),
        registerUser: builder.mutation({
            query: (userCredentials: any) => ({
                url: "/officer/create-account",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: userCredentials,
            })
        })
    })
});

export const {
    useLoginUserMutation,
    useRegisterUserMutation
} = authApi;

export default authApi;