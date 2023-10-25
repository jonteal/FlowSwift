import mongoose from "mongoose";
import moment from "moment";

// clientActivityComment Schema
const clientActivityCommentSchema = new mongoose.Schema({
  commentText: {
    type: String,
    required: true,
    minlength: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const ClientActivityComment = mongoose.model(
  "ClientActivityComment",
  clientActivityCommentSchema
);

export default ClientActivityComment;
