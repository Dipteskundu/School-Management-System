import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Student from "@/models/Student";
import Teacher from "@/models/Teacher";
import Class from "@/models/Class";
import Subject from "@/models/Subject";

export async function POST() {
  try {
    await dbConnect();

    await User.deleteMany({});
    await Student.deleteMany({});
    await Teacher.deleteMany({});
    await Class.deleteMany({});
    await Subject.deleteMany({});

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

    const class10A = await Class.create({
      name: "Class 10",
      section: "A",
      classTeacherId: teacherUser._id,
      capacity: 45,
    });

    const teacher = await Teacher.create({
      userId: teacherUser._id,
      employeeId: "TCH-001",
      qualification: "Ph.D. Mathematics",
      experience: 10,
      specialization: "Mathematics",
    });

    const student = await Student.create({
      userId: studentUser._id,
      classId: class10A._id,
      rollNo: 1,
      parentId: parentUser._id,
      gender: "Male",
    });

    await Subject.create([
      { name: "Mathematics", code: "MATH101", teacherId: teacherUser._id, classId: class10A._id, credits: 4 },
      { name: "English", code: "ENG101", classId: class10A._id, credits: 3 },
      { name: "Physics", code: "PHY101", classId: class10A._id, credits: 4 },
    ]);

    return NextResponse.json({
      message: "Database seeded successfully",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
