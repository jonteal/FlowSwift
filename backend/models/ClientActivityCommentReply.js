import mongoose from "mongoose";

// clientActivityCommentReply Schema
const clientActivityCommentReplySchema = new mongoose.Schema({
  commentText: {
    type: String,
    required: true,
    minlength: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ClientActivityComment",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const ClientActivityCommentReply = mongoose.model(
  "ClientActivityCommentReply",
  clientActivityCommentReplySchema
);

export default ClientActivityCommentReply;
