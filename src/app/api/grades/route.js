import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Grade from "@/models/Grade";

export async function GET() {
  try {
    await dbConnect();
    const grades = await Grade.find({})
      .populate("studentId")
      .populate("subjectId")
      .populate("gradedBy");
    return NextResponse.json(grades);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { studentId, subjectId, marks, maxMarks, examType, semester, gradedBy } = body;

    if (!studentId || !subjectId || marks === undefined || !examType) {
      return NextResponse.json({ error: "studentId, subjectId, marks, and examType are required" }, { status: 400 });
    }

    const grade = await Grade.create({
      studentId,
      subjectId,
      marks,
      maxMarks,
      examType,
      semester,
      gradedBy,
    });
    return NextResponse.json(grade, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
