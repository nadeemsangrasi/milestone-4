import { categoriesTable, db } from "@/lib/database";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const categories = await db.select().from(categoriesTable);
    if (categories.length === 0) {
      console.error("Error  gettng categories");
      return NextResponse.json(
        { success: false, message: "Error getting categories" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data: categories },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error getting categories", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error getting categories",
      },
      { status: 500 }
    );
  }
};
