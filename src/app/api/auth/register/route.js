import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { hashPassword } from "@/lib/auth";

export async function POST(request) {
  try {
    await dbConnect();
    const { name, email, password, role } = await request.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (role === "ADMIN") {
      return NextResponse.json(
        { error: "Admin accounts cannot be created through registration" },
        { status: 403 }
      );
    }

    const allowedRoles = ["TEACHER", "STUDENT", "PARENT"];
    if (!allowedRoles.includes(role)) {
      return NextResponse.json(
        { error: "Invalid role" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    const hashedPassword = hashPassword(password);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
    });

    return NextResponse.json(
      { message: "User registered successfully", userId: user._id },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
