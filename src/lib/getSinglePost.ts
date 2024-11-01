export const getSinglePost = async (slug: string) => {
  try {
    const res = await fetch(
      `https://milestonee-4.vercel.app/api/blog/post/single-post/${slug}`,
      {
        method: "GET",
        headers: {
          "Cache-Control": "no-store",
          Pragma: "no-cache",
          Expires: "0",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch the post data: ${res.statusText}`);
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching single post:", error);
    return null;
  }
};
