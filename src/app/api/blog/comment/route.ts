import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { commentsTable, db } from "@/lib/database";
import { and, eq } from "drizzle-orm";

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
      .where(eq(commentsTable.postId, Number(postId)));
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

export const PATCH = async (req: NextRequest, res: NextResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user) {
    console.error("user not authenticated");
    return NextResponse.json(
      { success: false, message: "user not authenticated" },
      { status: 401 }
    );
  }

  try {
    const { userId, commentId, content, username, imageUrl } = await req.json();
    if (!userId || !commentId || !content || !username || !imageUrl) {
      console.error("All fields are required");
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 500 }
      );
    }

    if (session.user.id !== userId) {
      console.error("You are not authorised to edit this comment");
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorised to edit this comment",
        },
        { status: 403 }
      );
    }
    const comment = await db
      .update(commentsTable)
      .set({ content, createdAt: new Date() })
      .where(
        and(eq(commentsTable.id, commentId), eq(commentsTable.userId, userId))
      )
      .returning();

    if (comment.length === 0) {
      console.error("Error editing comment");
      return NextResponse.json(
        { success: false, message: "Error editing comment" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "comment updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error editing comment", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error editing comment",
      },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user) {
    console.error("user not authenticated");
    return NextResponse.json(
      { success: false, message: "user not authenticated" },
      { status: 401 }
    );
  }
  try {
    const { userId, commentId } = await req.json();
    if (!userId || !commentId) {
      console.error("All fields are required");
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 500 }
      );
    }

    if (session.user.id !== userId) {
      console.error("You are not authorised to delete this comment");
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to delete this comment",
        },
        { status: 403 }
      );
    }
    const deletedComment = await db
      .delete(commentsTable)
      .where(
        and(eq(commentsTable.id, commentId), eq(commentsTable.userId, userId))
      )
      .returning();
    if (deletedComment.length === 0) {
      console.error("Error deleting comment");
      return NextResponse.json(
        { success: false, message: "Error deleting comment" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "comment deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting comment", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error deleting comment",
      },
      { status: 500 }
    );
  }
};
