import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { verifySessionToken } from "@/lib/auth";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const userId = verifySessionToken(token);
    if (!userId) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    await dbConnect();
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
