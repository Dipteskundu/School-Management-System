import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },
    qualification: {
      type: String,
      default: null,
    },
    experience: {
      type: Number,
      default: 0,
    },
    specialization: {
      type: String,
      default: null,
    },
    joiningDate: {
      type: Date,
      default: Date.now,
    },
    salary: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Teacher =
  mongoose.models.Teacher || mongoose.model("Teacher", teacherSchema);

export default Teacher;
