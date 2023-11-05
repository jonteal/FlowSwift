import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  billedThisMonth: true,
};

const clientBillingSlice = createSlice({
  name: "clientBilling",
  initialState,
  reducers: {
    setBilledThisMonthOff(state) {
      state.billedThisMonth = false;
    },
    setBilledThisMonthOn(state) {
      state.billedThisMonth = true;
    },
  },
});

export const { setBilledThisMonthOff, setBilledThisMonthOn } =
  clientBillingSlice.actions;

export default clientBillingSlice.reducer;
