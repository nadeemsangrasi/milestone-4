import { NextRequest, NextResponse } from "next/server";
import { db, postsTable } from "@/lib/database";
import { eq } from "drizzle-orm";

export const GET = async (
  req: NextRequest,
  { params }: { params: { slug: string } }
) => {
  const { slug } = params;

  // Set Cache-Control header to prevent caching
  const headers = {
    "Cache-Control": "no-store",
  };

  try {
    if (!slug) {
      console.error("All fields are required");
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400, headers }
      );
    }

    const singlePost = await db
      .select()
      .from(postsTable)
      .where(eq(postsTable.slug, slug));

    if (singlePost.length === 0) {
      console.error("Post not found");
      return NextResponse.json(
        { success: false, message: "Post not found" },
        { status: 404, headers }
      );
    }

    return NextResponse.json(
      { success: true, data: singlePost[0] },
      { status: 200, headers }
    );
  } catch (error) {
    console.error("Error fetching post", error);
    return NextResponse.json(
      { success: false, message: "Error fetching post" },
      { status: 500, headers }
    );
  }
};
