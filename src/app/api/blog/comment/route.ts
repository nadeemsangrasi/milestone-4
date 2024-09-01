import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { commentsTable, db } from "@/lib/database";
import { eq } from "drizzle-orm";

export const GET = async (
  req: NextRequest,
  { searchParams }: { searchParams: { postId: string } }
) => {
  const { postId } = searchParams;
  if (!postId) {
    console.error("error getting comments");
    return NextResponse.json(
      { success: false, message: "error getting comments" },
      { status: 500 }
    );
  }
  try {
    const comments = await db
      .select()
      .from(commentsTable)
      .where(eq(commentsTable.postId, postId));
    if (comments.length === 0) {
      console.error("no comments found");
      return NextResponse.json(
        { success: false, message: "no comments found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: comments },
      { status: 200 }
    );
  } catch (error) {
    console.error("something went wrong ");
    return NextResponse.json(
      { success: false, message: "something went wrong" },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user) {
    console.error("user not authenticated");
    return NextResponse.json(
      { success: false, message: "user not authenticated" },
      { status: 401 }
    );
  }

  try {
    const { postId, userId, content, username, imageUrl } = await req.json();
    if (!postId || !userId) {
      console.error("All fields are required");
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 500 }
      );
    }

    if (session.user.id !== userId) {
      console.error("You are not authorised to comment on this post");
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorised to comment on this post",
        },
        { status: 403 }
      );
    }
    const comment = await db
      .insert(commentsTable)
      .values({ username, imageUrl, content, postId, userId })
      .returning();
    if (comment.length === 0) {
      console.error("Error publishing comment");
      return NextResponse.json(
        { success: false, message: "Error publishing comment" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: true, message: "comment published successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error commenting on post", error);
    return NextResponse.json({
      success: false,
      message: "Error commenting on post",
    });
  }
};
