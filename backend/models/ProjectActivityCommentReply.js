import mongoose from "mongoose";

// projectActivityCommentReply Schema
const projectActivityCommentReplySchema = new mongoose.Schema({
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
    ref: "ProjectActivityComment",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const ProjectActivityCommentReply = mongoose.model(
  "ProjectActivityCommentReply",
  projectActivityCommentReplySchema
);

export default ProjectActivityCommentReply;
