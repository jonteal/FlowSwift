const mongoose = require("mongoose");

// projectHistoryItem Schema
const historyItemSchema = new mongoose.Schema({
  event: {
    type: String,
    enum: ["ClientCreated", "ProjectCreated"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
});

const HistoryItem = mongoose.model("HistoryItem", historyItemSchema);

module.exports = HistoryItem;
