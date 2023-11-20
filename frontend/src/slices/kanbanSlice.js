import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cardDescription: true,
};

const kanbanSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    setKanbanCardDescriptionOff(state) {
      state.cardDescription = false;
    },
    setKanbanCardDescriptionOn(state) {
      state.cardDescription = true;
    },
  },
});

export const { setKanbanCardDescriptionOff, setKanbanCardDescriptionOn } =
  kanbanSlice.actions;

export default kanbanSlice.reducer;
