import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Student from "@/models/Student";
import Teacher from "@/models/Teacher";
import Class from "@/models/Class";
import { verifyPassword, createSessionToken, hashPassword } from "@/lib/auth";

const DEMO_USERS = [
  { email: "admin@school.com", name: "Admin User", role: "ADMIN" },
  { email: "teacher@school.com", name: "Dr. Robert Wilson", role: "TEACHER" },
  { email: "student@school.com", name: "John Smith", role: "STUDENT" },
  { email: "parent@school.com", name: "Jane Smith", role: "PARENT" },
];

async function ensureDemoUsers() {
  const hashedPassword = hashPassword("password123");

  for (const demoUser of DEMO_USERS) {
    let user = await User.findOne({ email: demoUser.email });
    if (!user) {
      user = await User.create({
        email: demoUser.email,
        name: demoUser.name,
        password: hashedPassword,
        role: demoUser.role,
      });
    } else {
      if (!user.password || !verifyPassword("password123", user.password)) {
        user.password = hashedPassword;
        await user.save();
      }
    }

    if (user.role === "TEACHER") {
      const existingTeacher = await Teacher.findOne({ userId: user._id });
      if (!existingTeacher) {
        await Teacher.create({
          userId: user._id,
          employeeId: "TCH-001",
          qualification: "Ph.D. Mathematics",
          experience: 10,
          specialization: "Mathematics",
        });
      }
    } else if (user.role === "STUDENT") {
      const parentUser = await User.findOne({ role: "PARENT", email: "parent@school.com" });
      const teacherUser = await User.findOne({ role: "TEACHER", email: "teacher@school.com" });
      
      let class10A = await Class.findOne({ name: "Class 10", section: "A" });
      if (!class10A && teacherUser) {
        class10A = await Class.create({
          name: "Class 10",
          section: "A",
          classTeacherId: teacherUser._id,
          capacity: 45,
        });
      }

      const existingStudent = await Student.findOne({ userId: user._id });
      if (!existingStudent && class10A) {
        await Student.create({
          userId: user._id,
          classId: class10A._id,
          rollNo: 1,
          parentId: parentUser ? parentUser._id : null,
          gender: "Male",
        });
      }
    }
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    await ensureDemoUsers();

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    if (!user.password) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isValid = verifyPassword(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = createSessionToken(user._id.toString());

    const response = NextResponse.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    response.cookies.set("session_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
