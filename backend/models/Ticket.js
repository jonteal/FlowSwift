import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    typeOfTicket: {
      type: String,
      enum: ["User Story", "Defect"],
    },
    description: {
      type: String,
    },
    status: {
      type: String,
    },
    size: {
      type: Number,
      trim: true,
    },
    blocked: {
      type: Boolean,
    },
    blockedReason: {
      type: String,
    },
    ready: {
      type: Boolean,
    },
    kanbanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Kanban",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", TicketSchema);

export default Ticket;
