import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    section: {
      type: String,
      required: true,
      trim: true,
    },
    classTeacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    capacity: {
      type: Number,
      default: 40,
    },
    academicYear: {
      type: String,
      default: () => new Date().getFullYear().toString(),
    },
  },
  {
    timestamps: true,
  }
);

const Class = mongoose.models.Class || mongoose.model("Class", classSchema);

export default Class;
