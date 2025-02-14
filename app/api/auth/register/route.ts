import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { hashPassword } from "@/lib/auth";
import { RegisterCredentials } from "@/lib/types";

export async function POST(request: Request) {
  try {
    await connectDB();
    const body: RegisterCredentials = await request.json();

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email: body.email }, { username: body.username }],
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password and create user with admin role
    const hashedPassword = await hashPassword(body.password);
    const user = await User.create({
      ...body,
      password: hashedPassword,
      role: "admin",
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = user.toObject();

    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}
