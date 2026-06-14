import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Attendance from "@/models/Attendance";

export async function GET() {
  try {
    await dbConnect();
    const attendance = await Attendance.find({})
      .populate("studentId")
      .populate("markedBy");
    return NextResponse.json(attendance);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { studentId, date, status, subjectId, remarks, markedBy } = body;

    if (!studentId || !date || !status) {
      return NextResponse.json({ error: "studentId, date, and status are required" }, { status: 400 });
    }

    const attendance = await Attendance.create({
      studentId,
      date,
      status,
      subjectId,
      remarks,
      markedBy,
    });
    return NextResponse.json(attendance, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
