import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { signupSchema } from "@/schemas/authSchemas";
import db from "@/db";

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();
    const parseResult = signupSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: "Invalid input data",
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { email, password, firstName, lastName } = parseResult.data;

    const existingUser = await db.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    await db.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { error: "Internal Server Error", details: String(error) },
      { status: 500 }
    );
  }
}
