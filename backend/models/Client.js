import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  emailAddress: {
    type: String,
  },
  companyName: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Lead", "Prospect", "Current", "Former", "Cold"],
  },
});

const Client = mongoose.model("Client", ClientSchema);

export default Client;
