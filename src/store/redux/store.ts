import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/reducers";
import advertisementReducer from "./Advertisement/reducers";
import { advertisementApi, authApi } from "../../apis";

const store = configureStore({
    reducer: {
        advertisement: advertisementReducer,
        auth: authReducer,
        [advertisementApi.reducerPath]: advertisementApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        })
            .concat(authApi.middleware)
            .concat(advertisementApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;