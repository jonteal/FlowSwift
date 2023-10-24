import mongoose from "mongoose";

const OrganizationSchema = mongoose.Schema(
  {
    organizationName: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Organization = mongoose.model("Organization", OrganizationSchema);

export default Organization;
