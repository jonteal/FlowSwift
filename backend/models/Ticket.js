import mongoose from "mongoose";
import moment from "moment";

const TicketSchema = new mongoose.Schema({
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
    enum: ["Ready", "In Progress", "Done"],
  },
  blocked: {
    type: Boolean,
  },
  blockedReason: {
    type: String,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    get: (timeValue) => moment(timeValue).format("MM/DD/YYYY [at] hh:mm a"),
  },
});

const Ticket = mongoose.model("Ticket", TicketSchema);

export default Ticket;
