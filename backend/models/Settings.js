import mongoose from "mongoose";

const UserSettingsSchema = mongoose.Schema(
  {
    projectCardStatusBadge: {
      type: Boolean,
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

const UserSettings = mongoose.model("UserSettings", UserSettingsSchema);

export default UserSettings;
