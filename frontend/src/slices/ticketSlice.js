import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  size: true,
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    setSizeOff(state) {
      state.size = false;
    },
    setSizeOn(state) {
      state.size = true;
    },
  },
});

export const { setSizeOff, setSizeOn } = ticketSlice.actions;

export default ticketSlice.reducer;
