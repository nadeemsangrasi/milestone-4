"use client";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
const Categories = ({
  name,
  color,
  slug,
}: {
  name: string;
  color: string;
  slug: string;
}): JSX.Element => {
  const router = useRouter();

  return (
    <Button
      className={` font-bold text-xl sm:text-2xl ${color}`}
      onClick={() => router.push("/category/" + slug)}
    >
      {name}
    </Button>
  );
};

export default Categories;
