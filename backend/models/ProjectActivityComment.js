import mongoose from "mongoose";
import moment from "moment";

// projectActivityComment Schema
const projectActivityCommentSchema = new mongoose.Schema({
  commentText: {
    type: String,
    required: true,
    minlength: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
});

const ProjectActivityComment = mongoose.model(
  "ProjectActivityComment",
  projectActivityCommentSchema
);

export default ProjectActivityComment;
