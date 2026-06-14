import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Fee from "@/models/Fee";

export async function GET() {
  try {
    await dbConnect();
    const fees = await Fee.find({}).populate("studentId");
    return NextResponse.json(fees);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { studentId, amount, feeType, dueDate, paidAmount, status } = body;

    if (!studentId || !amount || !feeType || !dueDate) {
      return NextResponse.json({ error: "studentId, amount, feeType, and dueDate are required" }, { status: 400 });
    }

    const fee = await Fee.create({
      studentId,
      amount,
      feeType,
      dueDate,
      paidAmount,
      status,
    });
    return NextResponse.json(fee, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
