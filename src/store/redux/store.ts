import { configureStore } from "@reduxjs/toolkit";
import adsReducer from "./AdsPoint/reducers";

const store = configureStore({
    reducer: {
        adsPoint: adsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;