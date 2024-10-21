import { configureStore } from "@reduxjs/toolkit";
import adsReducer from "./Advertisement/reducers";
import authApi from "../../apis/authApi";
import authReducer from "./Auth/reducers";

const store = configureStore({
    reducer: {
        adsPoint: adsReducer,
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;