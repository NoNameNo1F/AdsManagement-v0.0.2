import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AUTH_API } from "../constants/baseUrls";

const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: AUTH_API,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (userCredentials) => ({
                url: "auth/login",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: userCredentials,
            })
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
        })
    })
});

export const {
    useLoginUserMutation,
    useLogoutUserMutation
} = authApi;

export default authApi;