import { useState } from "react";
import { ChevronDown, ChevronRight, File } from "lucide-react";

import { Item } from "@/components/SideBar/Item";
import type { Note } from "@/modules/notes/note.entity";

type Props = {
  note: Note;
  isExpanded?: boolean;
  layer?: number;
};

export const NoteItem = ({ note, isExpanded = false, layer = 0 }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const getIcon = () => {
    return isExpanded ? ChevronDown : isHovered ? ChevronRight : File;
  };

  return (
    <div
      role="button"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Item
        label={note.title ?? "無題"}
        icon={getIcon()}
        isActive={isHovered}
      />
    </div>
  );
};
