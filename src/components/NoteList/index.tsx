import { cn } from "@/lib/utils";

import { NoteItem } from "@/components/NoteList/NoteItem";
import { useNoteStore } from "@/modules/notes/note.state";

type Props = {
  layer?: number;
  parentId?: number;
};

export const NoteList = ({ layer = 0, parentId }: Props) => {
  const noteStore = useNoteStore();
  const notes = noteStore.getAll();

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
          <NoteItem note={note} layer={layer} />
        </div>
      ))}
    </>
  );
};
