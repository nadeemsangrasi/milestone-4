import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { db, postsTable, usersTable } from "@/lib/database";
import { and, eq } from "drizzle-orm";

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

    return NextResponse.json(
      {
        success: true,
        message: "post published successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("something went wrong", error);
    return NextResponse.json(
      { success: false, message: "something went wrong" },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    const posts = await db.select().from(postsTable);

    return NextResponse.json({ success: true, data: posts }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch posts", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch posts" },
      { status: 500 }
    );
  }
};

export const PATCH = async (req: NextRequest, res: NextResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user) {
    console.error("User not authenticated");
    return NextResponse.json(
      { success: false, message: "User not authenticated" },
      { status: 404 }
    );
  }

  try {
    const { postId, userId, categoryId, title, content, imageUrl, slug } =
      await req.json();

    if (
      !postId ||
      !userId ||
      !categoryId ||
      !title ||
      !content ||
      !imageUrl ||
      !slug
    ) {
      console.error("All fields are required");
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 500 }
      );
    }

    if (session.user.id !== userId) {
      console.error("You are not authorised to update this post");
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorised to update this post",
        },
        { status: 400 }
      );
    }

    const updatedPost = await db
      .update(postsTable)
      .set({
        categoryId,
        title,
        imageUrl,
        content,
        slug,
        createdAt: new Date(),
      })
      .where(and(eq(postsTable.id, postId), eq(postsTable.userId, userId)))
      .returning();

    if (updatedPost.length === 0) {
      console.error("Post not found");
      return NextResponse.json({ success: false, message: "Post not found" });
    }

    return NextResponse.json(
      { success: true, message: "Post updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update post", error);
    return NextResponse.json(
      { success: false, message: "Failed to update post" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user) {
    console.error("User not authenticated");
    return NextResponse.json(
      { success: false, message: "User not authenticated" },
      { status: 401 } // 401 Unauthorized is more appropriate here
    );
  }

  try {
    const { userId, postId } = await req.json();

    if (!userId || !postId) {
      console.error("All fields are required");
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    if (userId !== session.user.id) {
      console.error(
        "Unauthorized deletion attempt by userId:",
        session.user.id
      );
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to delete this post",
        },
        { status: 403 } // 403 Forbidden is more appropriate here
      );
    }

    const deleteResult = await db
      .delete(postsTable)
      .where(and(eq(postsTable.id, postId), eq(postsTable.userId, userId)))
      .returning();

    if (deleteResult.length === 0) {
      console.error("Post not found for deletion", { postId, userId });
      return NextResponse.json(
        { success: false, message: "Post not found" },
        { status: 404 }
      );
    }

    console.info("Post deleted successfully", { postId, userId });
    return NextResponse.json(
      { success: true, message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting post", { postId, userId, error });
    return NextResponse.json(
      { success: false, message: "Error deleting post" },
      { status: 500 }
    );
  }
};
