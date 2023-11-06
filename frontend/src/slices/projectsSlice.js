import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gridView: true,
  statusBadge: true,
  clientName: true,
  description: true,
  budget: true,
  estimate: true,
  dates: true,
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
    setDescriptionOff(state) {
      state.description = false;
    },
    setDescriptionOn(state) {
      state.description = true;
    },
    setBudgetOff(state) {
      state.budget = false;
    },
    setBudgetOn(state) {
      state.budget = true;
    },
    setEstimateOff(state) {
      state.estimate = false;
    },
    setEstimateOn(state) {
      state.estimate = true;
    },
    setDatesOff(state) {
      state.dates = false;
    },
    setDatesOn(state) {
      state.dates = true;
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
  setDescriptionOff,
  setDescriptionOn,
  setBudgetOff,
  setBudgetOn,
  setEstimateOff,
  setEstimateOn,
  setDatesOff,
  setDatesOn,
} = projectsSlice.actions;

export default projectsSlice.reducer;
