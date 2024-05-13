import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    // validate here... (can use zod)

    console.log({ email, password });

    const hashedPassword = await hash(password, 10);
    const response = await sql`
        INSERT into users(email, password, name)
        VALUES (${email}, ${hashedPassword}, ${email})
    `;
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({ message: "success" });
}
