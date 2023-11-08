import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  charts: true,
  pieChart: true,
  barChart: true,
  lineChart: true,
};

const clientsListSlice = createSlice({
  name: "clientsList",
  initialState,
  reducers: {
    setChartsOff(state) {
      state.charts = false;
    },
    setChartsOn(state) {
      state.charts = true;
    },
    setPieChartOff(state) {
      state.pieChart = false;
    },
    setPieCharteOn(state) {
      state.pieChart = true;
    },
    setBarChartOff(state) {
      state.barChart = false;
    },
    setBarChartOn(state) {
      state.barChart = true;
    },
    setLineChartOff(state) {
      state.lineChart = false;
    },
    setLineChartOn(state) {
      state.lineChart = true;
    },
  },
});

export const {
  setChartsOff,
  setChartsOn,
  setPieChartOff,
  setPieCharteOn,
  setBarChartOff,
  setBarChartOn,
  setLineChartOff,
  setLineChartOn,
} = clientsListSlice.actions;

export default clientsListSlice.reducer;
