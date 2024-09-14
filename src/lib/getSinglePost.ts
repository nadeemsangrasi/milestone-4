export const getSinglePost = async (slug: string) => {
  try {
    const res = await fetch(
      `https://milestonee.vercel.app/api/blog/post/single-post/${slug}`,
      {
        method: "GET",
        headers: {
          "Cache-Control": "no-store",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch the post data");
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching single post:", error);
    return null;
  }
};

