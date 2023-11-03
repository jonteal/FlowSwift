import mongoose from "mongoose";

const KanbanStatusColumnSchema = new mongoose.Schema(
  {
    columnState: {
      type: String,
    },
    columnDescription: {
      type: String,
    },
    position: {
      type: Number,
      required: true,
    },
    kanbanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Kanban",
    },
  },
  { timestamps: true }
);

const KanbanStatusColumn = mongoose.model(
  "KanbanStatusColumn",
  KanbanStatusColumnSchema
);

export default KanbanStatusColumn;
