import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../slices/apiSlice";
import authReducer from "../slices/authSlice";
import ticketSlice from "../slices/ticketSlice";
import featuresSlice from "../slices/featuresSlice";
import projectsSlice from "../slices/projectsSlice";
import clientBilling from "../slices/clientBilling";
import clientsListSlice from "../slices/clientsListSlice";
import themeSlice from "../slices/themeSlice";
import kanbanSlice from "../slices/kanbanSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    ticket: ticketSlice,
    features: featuresSlice,
    projects: projectsSlice,
    clientBilling: clientBilling,
    clientsList: clientsListSlice,
    theme: themeSlice,
    kanban: kanbanSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

// export const setupStore = (preloadedState) => {
//   return configureStore({
//     reducer: rootReducer,
//     preloadedState,
//   });
// };

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;
