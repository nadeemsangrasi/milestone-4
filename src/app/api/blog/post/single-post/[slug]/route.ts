import { NextRequest, NextResponse } from "next/server";

import { db, postsTable } from "@/lib/database";
import { eq } from "drizzle-orm";

export const GET = async (
  req: NextRequest,
  res:NextResponse,
  context: { params: { slug: string } }
) => {
  const { slug } = context.params;
  res.setHeader("Cache-Control", "no-store");

  try {
    if (!slug) {
      console.error("All fields are required");
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const singlePost = await db
      .select()
      .from(postsTable)
      .where(eq(postsTable.slug, slug));

    if (singlePost.length === 0) {
      console.error("Post not found for deletion");
      return NextResponse.json(
        { success: false, message: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: singlePost[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting post", error);
    return NextResponse.json(
      { success: false, message: "Error deleting post" },
      { status: 500 }
    );
  }
};
