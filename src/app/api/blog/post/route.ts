import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { db, postsTable } from "@/lib/database";
import { and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { CustomSession } from "@/types/types";

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

export const POST = async (req: NextRequest) => {
  try {
    const session = (await getServerSession(
      authOptions as any
    )) as CustomSession;

    if (!session) {
      console.error("User not authenticated");
      return NextResponse.json(
        { success: false, message: "User not authenticated" },
        { status: 401 }
      );
    }
    const {
      title,
      content,
      categorySlug,
      imageUrl,
      slug,
      userImageUrl,
      username,
    } = await req.json();

    if (
      !title ||
      !content ||
      !categorySlug ||
      !imageUrl ||
      !slug ||
      !username ||
      !userImageUrl
    ) {
      console.error("All fields are required");
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const post = await db
      .insert(postsTable)
      .values({
        title,
        username,
        content,
        imageUrl,
        categorySlug,
        slug,
        userId: session.user.id || "",
        userImageUrl,
      })
      .returning();

    if (post.length === 0) {
      console.error("Error publishing post");
      return NextResponse.json(
        { success: false, message: "Error publishing post" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Post published successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Something went wrong", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
};

export const PATCH = async (req: NextRequest) => {
  const session = (await getServerSession({
    req,
    ...authOptions,
  } as any)) as CustomSession;

  if (!session || !session.user) {
    console.error("User not authenticated");
    return NextResponse.json(
      { success: false, message: "User not authenticated" },
      { status: 401 }
    );
  }

  try {
    const { postId, userId, categorySlug, title, content, imageUrl, slug } =
      await req.json();

    if (
      !postId ||
      !userId ||
      !categorySlug ||
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
      console.error("You are not authorized to update this post");
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to update this post",
        },
        { status: 403 }
      );
    }

    const updatedPost = await db
      .update(postsTable)
      .set({
        categorySlug,
        title,
        imageUrl,
        content,
        slug,
        isEdited: true,
        createdAt: new Date(),
      })
      .where(and(eq(postsTable.id, postId), eq(postsTable.userId, userId)))
      .returning();

    if (updatedPost.length === 0) {
      console.error("Post not found");
      return NextResponse.json({ success: false, message: "Post not found" });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Post updated successfully",
        data: updatedPost[0],
      },
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
  const session = (await getServerSession(authOptions as any)) as CustomSession;

  if (!session || !session.user) {
    console.error("User not authenticated");
    return NextResponse.json(
      { success: false, message: "User not authenticated" },
      { status: 401 } // 401 Unauthorized is more appropriate here
    );
  }

  try {
    const url = new URL(req.url);
    const postId = url.searchParams.get("postId");
    const userId = url.searchParams.get("userId");

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
      .where(
        and(eq(postsTable.id, Number(postId)), eq(postsTable.userId, userId))
      )
      .returning();

    if (deleteResult.length === 0) {
      console.error("Post not found for deletion", { postId, userId });
      return NextResponse.json(
        { success: false, message: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Post deleted successfully" },
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
