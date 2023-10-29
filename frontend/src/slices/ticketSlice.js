import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  size: true,
  description: true,
  createdDate: true,
  owner: true,
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
    setDescriptionOff(state) {
      state.description = false;
    },
    setDescriptionOn(state) {
      state.description = true;
    },
    setCreatedDateOff(state) {
      state.createdDate = false;
    },
    setCreatedDateOn(state) {
      state.createdDate = true;
    },
    setOwnerOff(state) {
      state.owner = false;
    },
    setOwnerOn(state) {
      state.owner = true;
    },
  },
});

export const {
  setSizeOff,
  setSizeOn,
  setDescriptionOff,
  setDescriptionOn,
  setCreatedDateOff,
  setCreatedDateOn,
  setOwnerOff,
  setOwnerOn,
} = ticketSlice.actions;

export default ticketSlice.reducer;
