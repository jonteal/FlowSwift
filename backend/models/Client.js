import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
