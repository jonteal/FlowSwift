import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import authReducer from "./slices/authSlice";
import ticketSlice from "./slices/ticketSlice";
import featuresSlice from "./slices/featuresSlice";
import projectsSlice from "./slices/projectsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    ticket: ticketSlice,
    features: featuresSlice,
    projects: projectsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
