import { db, usersTable } from "@/lib/database";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const { fullName, email, password } = await request.json();
    if (!fullName || !email || !password) {
      return Response.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    const existingUserByEmail = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (existingUserByEmail.length > 0) {
      return Response.json(
        {
          success: false,
          message: "User already exists with this email",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const image = "https://github.com/shadcn.png";
    const newUser = await db
      .insert(usersTable)
      .values({
        name: fullName,
        email,
        image,
        password: hashedPassword,
      })
      .returning();

    if (newUser.length === 0) {
      return Response.json(
        {
          success: false,
          message: "Error registering user in db",
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "User registered successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      { status: 500 }
    );
  }
}
