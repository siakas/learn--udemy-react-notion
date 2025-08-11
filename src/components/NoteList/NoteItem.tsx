import { useState, type MouseEvent } from "react";
import {
  ChevronDown,
  ChevronRight,
  File,
  MoreHorizontal,
  Plus,
  Trash,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Item } from "@/components/SideBar/Item";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Note } from "@/modules/notes/note.entity";

type Props = {
  note: Note;
  isExpanded?: boolean;
  layer?: number;
  onCreate?: (event: MouseEvent) => void;
  onExpande?: (event: MouseEvent) => void;
};

export const NoteItem = ({
  note,
  isExpanded = false,
  layer = 0,
  onCreate,
  onExpande,
}: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const getIcon = () => {
    return isExpanded ? ChevronDown : isHovered ? ChevronRight : File;
  };

  const menu = (
    <div
      className={cn(
        "ml-auto flex items-center gap-x-2",
        !isHovered && "opacity-0",
      )}
    >
      <DropdownMenu>
        <DropdownMenuTrigger onClick={(e) => e.stopPropagation()}>
          <div
            role="button"
            className="ml-auto h-full cursor-pointer rounded-sm hover:bg-neutral-300"
          >
            <MoreHorizontal className="text-muted-foreground size-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-60"
          align="start"
          side="right"
          forceMount
        >
          <DropdownMenuItem className="cursor-pointer">
            <Trash className="mr-2 size-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div
        role="button"
        className="ml-auto h-full rounded-sm hover:bg-neutral-300"
        onClick={onCreate}
      >
        <Plus className="text-muted-foreground size-4" />
      </div>
    </div>
  );

  return (
    <div
      role="button"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ paddingLeft: layer !== 0 ? `${layer * 12 + 12}px` : "0" }}
    >
      <Item
        label={note.title ?? "無題"}
        icon={getIcon()}
        onIconClick={onExpande}
        isActive={isHovered}
        trailingItem={menu}
      />
    </div>
  );
};
