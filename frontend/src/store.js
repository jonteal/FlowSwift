import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import ticketSlice from "./slices/ticketSlice";
import featuresSlice from "./slices/featuresSlice";
import { apiSlice } from "./slices/apiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    ticket: ticketSlice,
    features: featuresSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
