import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: false,
};

const featuresSlice = createSlice({
  name: "features",
  initialState,
  reducers: {
    setNotificationsOff(state) {
      state.notifications = false;
    },
    setNotificationsOn(state) {
      state.notifications = true;
    },
  },
});

export const { setNotificationsOff, setNotificationsOn } =
  featuresSlice.actions;

export default featuresSlice.reducer;
