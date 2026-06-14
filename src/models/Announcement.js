import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    targetAudience: {
      type: [String],
      enum: ["ADMIN", "TEACHER", "STUDENT", "PARENT", "ALL"],
      default: ["ALL"],
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Announcement =
  mongoose.models.Announcement ||
  mongoose.model("Announcement", announcementSchema);

export default Announcement;
