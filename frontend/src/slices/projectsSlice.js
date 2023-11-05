import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gridView: true,
  statusBadge: true,
  clientName: true,
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
    setStatusBadgeOff(state) {
      state.statusBadge = false;
    },
    setStatusBadgeOn(state) {
      state.statusBadge = true;
    },
    setClientNameOff(state) {
      state.clientName = false;
    },
    setClientNameOn(state) {
      state.clientName = true;
    },
  },
});

export const {
  setGridViewOff,
  setGridViewOn,
  setStatusBadgeOff,
  setStatusBadgeOn,
  setClientNameOff,
  setClientNameOn,
} = projectsSlice.actions;

export default projectsSlice.reducer;
