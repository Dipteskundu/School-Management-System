import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Class from "@/models/Class";

export async function GET() {
  try {
    await dbConnect();
    const classes = await Class.find({}).populate("classTeacherId");
    return NextResponse.json(classes);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { name, section, classTeacherId, capacity, academicYear } = body;

    if (!name || !section || !academicYear) {
      return NextResponse.json({ error: "name, section, and academicYear are required" }, { status: 400 });
    }

    const cls = await Class.create({
      name,
      section,
      classTeacherId,
      capacity,
      academicYear,
    });
    return NextResponse.json(cls, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
