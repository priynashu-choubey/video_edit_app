import { connectToDatabse } from "@/lib/db";
import User from "@/models/User";
import { error, log } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        {
          error: "Email and password are required",
        },
        {
          status: 400,
        }
      );
    }
    await connectToDatabse();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "user already registered" },
        { status: 400 }
      );
    }
    await User.create({
      email,
      password,
    });
    return NextResponse.json(
      { message: "user registered successfully " },
      { status: 400 }
    );
  } catch (error) {
    console.error("Registration error", error);

    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 400 }
    );
  }
}
