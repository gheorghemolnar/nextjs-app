"use client";

import { Row } from "@tanstack/react-table";
import { Copy, MoreHorizontal, Pen, Star, Tags, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { controlSchema } from "../../../../types/schema";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row
}: DataTableRowActionsProps<TData>) {
  try {
    // TODO: USED TO CHECK IF DATA is VALID: some issues with data formatting: 1 timestamp, then string
    controlSchema.parse(row.original);
    console.log("🚀 > row.original:", row.original);
  } catch (error) {
    // console.log("DataTableRowAction parsing > ERROR >", error)
    // console.log("DataTableRowAction parsing > ERROR >", row.original)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Ouvrir</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>
          <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Modifier
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
