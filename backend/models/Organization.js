import mongoose from "mongoose";

const OrganizationSchema = mongoose.Schema(
  {
    organizationName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Organization = mongoose.model("Organization", OrganizationSchema);

export default Organization;
