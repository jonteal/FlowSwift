import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // project card
  gridView: true,
  statusBadge: true,
  clientName: true,
  description: true,
  budget: true,
  estimate: true,
  dates: true,
  projectOwner: true,
  priorityBadge: true,

  // table
  projectName: true,
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
    setPriorityBadgeOff(state) {
      state.priorityBadge = false;
    },
    setPriorityBadgeOn(state) {
      state.priorityBadge = true;
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
    setProjectOwnerOff(state) {
      state.projectOwner = false;
    },
    setProjectOwnerOn(state) {
      state.projectOwner = true;
    },

    // table
    setProjectNameOff(state) {
      state.projectName = false;
    },
    setProjectNameOn(state) {
      state.projectName = true;
    },
  },
});

export const {
  setGridViewOff,
  setGridViewOn,
  setStatusBadgeOff,
  setStatusBadgeOn,
  setPriorityBadgeOff,
  setPriorityBadgeOn,
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
  setProjectOwnerOff,
  setProjectOwnerOn,
  setProjectNameOff,
  setProjectNameOn,
} = projectsSlice.actions;

export default projectsSlice.reducer;
