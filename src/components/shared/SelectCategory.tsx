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
import { IPost } from "@/types/types";

const frameworks = [
  {
    snug: "next.js",
    label: "Next.js",
  },
  {
    snug: "sveltekit",
    label: "SvelteKit",
  },
  {
    snug: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    snug: "remix",
    label: "Remix",
  },
  {
    snug: "astro",
    label: "Astro",
  },
];

export default function SelectCategory({
  formData,
  setFormData,
}: {
  formData: IPost;
  setFormData: React.Dispatch<React.SetStateAction<IPost>>;
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
            ? frameworks.find(
                (framework) => framework.snug === formData.category
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
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.snug}
                  value={framework.snug}
                  onSelect={(currentValue) => {
                    setFormData({
                      ...formData,
                      category:
                        currentValue === formData.category ? "" : currentValue,
                    });
                    setOpen(false);
                  }}
                >
                  {framework.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      formData.category === framework.snug
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
