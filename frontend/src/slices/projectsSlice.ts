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
  projectClient: true,
  projectStatus: true,
  projectStartDate: true,
  projectDeadline: true,
  projectPriority: true,
  projectBudget: true,
  projectEstimate: true,
  projectOwnerTable: true,
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
    setProjectClientOff(state) {
      state.projectClient = false;
    },
    setProjectClientOn(state) {
      state.projectClient = true;
    },
    setProjectStatusOff(state) {
      state.projectStatus = false;
    },
    setProjectStatusOn(state) {
      state.projectStatus = true;
    },
    setProjectStartDateOff(state) {
      state.projectStartDate = false;
    },
    setProjectStartDateOn(state) {
      state.projectStartDate = true;
    },
    setProjectDeadlineOff(state) {
      state.projectDeadline = false;
    },
    setProjectDeadlineOn(state) {
      state.projectDeadline = true;
    },
    setProjectPriorityOff(state) {
      state.projectPriority = false;
    },
    setProjectPriorityOn(state) {
      state.projectPriority = true;
    },
    setProjectBudgetOff(state) {
      state.projectBudget = false;
    },
    setProjectBudgetOn(state) {
      state.projectBudget = true;
    },
    setProjectEstimateOff(state) {
      state.projectEstimate = false;
    },
    setProjectEstimateOn(state) {
      state.projectEstimate = true;
    },
    setProjectOwnerTableOff(state) {
      state.projectOwnerTable = false;
    },
    setProjectOwnerTableOn(state) {
      state.projectOwnerTable = true;
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
  setProjectClientOff,
  setProjectClientOn,
  setProjectStatusOff,
  setProjectStatusOn,
  setProjectStartDateOff,
  setProjectStartDateOn,
  setProjectDeadlineOff,
  setProjectDeadlineOn,
  setProjectPriorityOff,
  setProjectPriorityOn,
  setProjectBudgetOff,
  setProjectBudgetOn,
  setProjectEstimateOff,
  setProjectEstimateOn,
  setProjectOwnerTableOff,
  setProjectOwnerTableOn,
} = projectsSlice.actions;

export default projectsSlice.reducer;
