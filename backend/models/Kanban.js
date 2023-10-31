import mongoose from "mongoose";

const KanbanSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    statusColumns: {
      type: String,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  },
  { timestamps: true }
);

const Kanban = mongoose.model("Kanban", KanbanSchema);

export default Kanban;
