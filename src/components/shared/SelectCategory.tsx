"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IUploadPost } from "@/types/types";

const categories: { slug: string; label: string }[] = [
  {
    slug: "fashion",
    label: "Fashion",
  },
  {
    slug: "food",
    label: "Food",
  },
  {
    slug: "coding",
    label: "Coding",
  },
  {
    slug: "style",
    label: "Style",
  },
  {
    slug: "travel",
    label: "Travel",
  },
  {
    slug: "culture",
    label: "Culture",
  },
];

export default function SelectCategory({
  formData,
  setFormData,
}: {
  formData: IUploadPost;
  setFormData: React.Dispatch<React.SetStateAction<IUploadPost>>;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        className="bg-gray-300 text-black hover:bg-gray-300 hover:text-black font-bold"
      >
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {formData.category
            ? categories.find(
                (category: { slug: string; label: string }) =>
                  category.slug === formData.category
              )?.label
            : "Select category..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search category..." className="h-9" />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {categories.map((category: { slug: string; label: string }) => (
                <CommandItem
                  key={category.slug}
                  value={category.slug}
                  onSelect={(currentValue) => {
                    setFormData({
                      ...formData,
                      category:
                        currentValue === formData.category ? "" : currentValue,
                    });
                    setOpen(false);
                  }}
                >
                  {category.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      formData.category === category.slug
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
