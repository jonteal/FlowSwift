import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gridView: true,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setGridViewOff(state) {
      state.gridView = false;
    },
    setGridViewOn(state) {
      state.gridView = true;
    },
  },
});

export const { setGridViewOff, setGridViewOn } = projectsSlice.actions;

export default projectsSlice.reducer;
