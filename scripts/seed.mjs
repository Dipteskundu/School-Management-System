import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Please define MONGODB_URI environment variable");
  process.exit(1);
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, enum: ["ADMIN", "TEACHER", "STUDENT", "PARENT"], default: "STUDENT" },
    image: { type: String, default: null },
    phone: { type: String, default: null },
    address: { type: String, default: null },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

const studentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    rollNo: { type: Number, required: true },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
  },
  { timestamps: true }
);

const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);

const teacherSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    employeeId: { type: String, required: true, unique: true },
    qualification: { type: String },
    experience: { type: Number },
    specialization: { type: String },
  },
  { timestamps: true }
);

const Teacher = mongoose.models.Teacher || mongoose.model("Teacher", teacherSchema);

const classSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    section: { type: String, required: true },
    classTeacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    capacity: { type: Number, default: 40 },
    academicYear: { type: String, default: "2024-2025" },
  },
  { timestamps: true }
);

const Class = mongoose.models.Class || mongoose.model("Class", classSchema);

const subjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    credits: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const Subject = mongoose.models.Subject || mongoose.model("Subject", subjectSchema);

async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully.");

    console.log("Clearing existing data...");
    await User.deleteMany({});
    await Student.deleteMany({});
    await Teacher.deleteMany({});
    await Class.deleteMany({});
    await Subject.deleteMany({});

    console.log("Creating users...");
    const admin = await User.create({
      email: "admin@school.com",
      name: "Admin User",
      role: "ADMIN",
    });

    const teacherUser = await User.create({
      email: "teacher@school.com",
      name: "Dr. Robert Wilson",
      role: "TEACHER",
    });

    const studentUser = await User.create({
      email: "student@school.com",
      name: "John Smith",
      role: "STUDENT",
    });

    const parentUser = await User.create({
      email: "parent@school.com",
      name: "Jane Smith",
      role: "PARENT",
    });

    console.log("Creating class...");
    const class10A = await Class.create({
      name: "Class 10",
      section: "A",
      classTeacherId: teacherUser._id,
      capacity: 45,
    });

    console.log("Creating teacher record...");
    await Teacher.create({
      userId: teacherUser._id,
      employeeId: "TCH-001",
      qualification: "Ph.D. Mathematics",
      experience: 10,
      specialization: "Mathematics",
    });

    console.log("Creating student record...");
    await Student.create({
      userId: studentUser._id,
      classId: class10A._id,
      rollNo: 1,
      parentId: parentUser._id,
      gender: "Male",
    });

    console.log("Creating subjects...");
    await Subject.create([
      { name: "Mathematics", code: "MATH101", teacherId: teacherUser._id, classId: class10A._id, credits: 4 },
      { name: "English", code: "ENG101", classId: class10A._id, credits: 3 },
      { name: "Physics", code: "PHY101", classId: class10A._id, credits: 4 },
    ]);

    console.log("\nDatabase seeded successfully!");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seed();
