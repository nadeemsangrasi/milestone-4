import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { db, postsTable } from "@/lib/database";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user || session) {
    console.error("user not authenticated");
    return NextResponse.json(
      { success: false, message: "user not authenticated" },
      { status: 404 }
    );
  }

  try {
    const { title, content, categoryId, imageUrl, slug } = await req.json();
    if (!title || !content || !categoryId || !imageUrl || !slug) {
      console.error("All fields are required");
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 500 }
      );
    }
    await db
      .insert(postsTable)
      .values({
        title,
        content,
        imageUrl,
        categoryId,
        slug,
        userId: session.user.id,
      })
      .returning();

    return NextResponse.json({
      success: true,
      message: "post published successfully",
    });
  } catch (error) {
    console.error("something went wrong", error);
    return NextResponse.json(
      { success: false, message: "something went wrong" },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const posts = await db.select().from(postsTable);

    return NextResponse.json({ success: true, data: posts });
  } catch (error) {
    console.error("Failed to fetch posts", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch posts" },
      { status: 500 }
    );
  }
};
