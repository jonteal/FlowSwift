import mongoose from "mongoose";
import moment from "moment";

const ServiceSchema = new mongoose.Schema({
  service: {
    type: String,
  },
  cost: {
    type: Number,
  },
  notes: {
    type: String,
  },
  paymentSchedule: {
    type: String,
    enum: ["Weekly", "Monthly", "Yearly", "Per Instance"],
  },
  status: {
    type: String,
    enum: ["on", "off", "paused"],
  },
  serviceProvider: {
    type: String,
    enum: ["In House", "Third Party"],
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  startDate: {
    type: String,
    get: (timeValue) => moment(timeValue).format("MM/DD/YYYY"),
  },
  endDate: {
    type: String,
    get: (timeValue) => moment(timeValue).format("MM/DD/YYYY"),
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    get: (timeValue) => moment(timeValue).format("MM/DD/YYYY"),
  },
});

const Service = mongoose.model("Service", ServiceSchema);

export default Service;
