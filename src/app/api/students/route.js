import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Student from "@/models/Student";

export async function GET() {
  try {
    await dbConnect();
    const students = await Student.find({}).populate("userId").populate("classId");
    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { userId, classId, rollNo, parentId, gender } = body;

    if (!userId || !classId || !rollNo) {
      return NextResponse.json({ error: "userId, classId, and rollNo are required" }, { status: 400 });
    }

    const student = await Student.create({
      userId,
      classId,
      rollNo,
      parentId,
      gender,
    });
    return NextResponse.json(student, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
