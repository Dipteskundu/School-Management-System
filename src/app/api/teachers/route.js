import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Teacher from "@/models/Teacher";

export async function GET() {
  try {
    await dbConnect();
    const teachers = await Teacher.find({}).populate("userId");
    return NextResponse.json(teachers);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { userId, employeeId, qualification, experience, specialization } = body;

    if (!userId || !employeeId) {
      return NextResponse.json({ error: "userId and employeeId are required" }, { status: 400 });
    }

    const teacher = await Teacher.create({
      userId,
      employeeId,
      qualification,
      experience,
      specialization,
    });
    return NextResponse.json(teacher, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
