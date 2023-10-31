import mongoose from "mongoose";

const KanbanStatusColumnSchema = new mongoose.Schema(
  {
    columnState: {
      type: String,
    },
    description: {
      type: String,
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
