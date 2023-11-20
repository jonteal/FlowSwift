import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cardDescription: true,
  cardClient: true,
  cardProject: true,
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
    setKanbanCardClientOff(state) {
      state.cardClient = false;
    },
    setKanbanCardClientOn(state) {
      state.cardClient = true;
    },
    setKanbanCardProjectOff(state) {
      state.cardProject = false;
    },
    setKanbanCardProjectOn(state) {
      state.cardProject = true;
    },
  },
});

export const {
  setKanbanCardDescriptionOff,
  setKanbanCardDescriptionOn,
  setKanbanCardClientOff,
  setKanbanCardClientOn,
  setKanbanCardProjectOff,
  setKanbanCardProjectOn,
} = kanbanSlice.actions;

export default kanbanSlice.reducer;
