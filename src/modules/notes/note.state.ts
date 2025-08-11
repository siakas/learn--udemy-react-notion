import { atom, useAtom } from "jotai";
import { uniqBy } from "lodash-es";

import type { Note } from "@/modules/notes/note.entity";

const noteAtom = atom<Note[]>([]);

export const useNoteStore = () => {
  const [notes, setNotes] = useAtom(noteAtom);

  // 新しいノートを追加（ID による重複排除）
  const set = (newNotes: Note[]) => {
    setNotes((oldNotes) => uniqBy([...oldNotes, ...newNotes], 'id'));
  };

  // 既存ノートを更新（ID ベースで上書き）
  const update = (updatedNote: Note) => {
    setNotes((oldNotes) =>
      oldNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  const getById = (id: number) => notes.find((note) => note.id === id);

  return {
    getAll: () => notes,
    set,
    update,
    getById,
  };
};
