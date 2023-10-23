import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import themeSlice from "./slices/themeSlice";
import { apiSlice } from "./slices/apiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    theme: themeSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
