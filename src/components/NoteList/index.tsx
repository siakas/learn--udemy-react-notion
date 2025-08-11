import type { MouseEvent } from "react";

import { cn } from "@/lib/utils";

import { NoteItem } from "@/components/NoteList/NoteItem";
import { useCurrentUserStore } from "@/modules/auth/current-user.state";
import type { Note } from "@/modules/notes/note.entity";
import { noteRepository } from "@/modules/notes/note.repository";
import { useNoteStore } from "@/modules/notes/note.state";

type Props = {
  layer?: number;
  parentId?: number;
};

export const NoteList = ({ layer = 0, parentId }: Props) => {
  const noteStore = useNoteStore();
  const notes = noteStore.getAll();
  const { currentUser } = useCurrentUserStore();

  const createChild = async (e: MouseEvent, parentId: number) => {
    e.stopPropagation();
    const newNote = await noteRepository.create(currentUser!.id, { parentId });
    noteStore.set([newNote]);
  };

  const fetchChildren = async (e: MouseEvent, note: Note) => {
    e.stopPropagation();
    const children = await noteRepository.find(currentUser!.id, note.id);
    if (children === null) return;
    noteStore.set(children);
  };

  return (
    <>
      <p
        className={cn(
          "text-muted-foreground/80 hidden text-sm font-medium",
          layer === 0 && "hidden",
        )}
        style={{ paddingLeft: layer ? `${layer * 12 + 25}px` : undefined }}
      >
        ページがありません
      </p>
      {notes.map((note) => (
        <div key={note.id}>
          <NoteItem
            note={note}
            layer={layer}
            onCreate={(e) => createChild(e, note.id)}
            onExpande={(e) => fetchChildren(e, note)}
          />
        </div>
      ))}
    </>
  );
};
