import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    marks: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    maxMarks: {
      type: Number,
      default: 100,
    },
    examType: {
      type: String,
      enum: ["Quiz", "Assignment", "Midterm", "Final", "Practical"],
      required: true,
    },
    remarks: {
      type: String,
      default: null,
    },
    gradedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Grade = mongoose.models.Grade || mongoose.model("Grade", gradeSchema);

export default Grade;
