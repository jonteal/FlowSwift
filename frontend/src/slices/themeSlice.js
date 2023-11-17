import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setDarkModeOff(state) {
      state.darkMode = false;
    },
    setDarkModeOn(state) {
      state.darkMode = true;
    },
  },
});

export const { setDarkModeOff, setDarkModeOn } = themeSlice.actions;

export default themeSlice.reducer;
