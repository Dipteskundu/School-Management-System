import mongoose from "mongoose";

const feeSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    feeType: {
      type: String,
      enum: ["Tuition", "Library", "Lab", "Sports", "Transport", "Other"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    paidAmount: {
      type: Number,
      default: 0,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    paidAt: {
      type: Date,
      default: null,
    },
    transactionId: {
      type: String,
      default: null,
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

const Fee = mongoose.models.Fee || mongoose.model("Fee", feeSchema);

export default Fee;
