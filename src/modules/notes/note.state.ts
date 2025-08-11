import { atom, useAtom } from "jotai";
import { isEqual, unionWith } from "lodash-es";

import type { Note } from "@/modules/notes/note.entity";

const noteAtom = atom<Note[]>([]);

export const useNoteStore = () => {
  const [notes, setNotes] = useAtom(noteAtom);

  const set = (newNotes: Note[]) => {
    // oldNotes と newNotes を重複なしで結合（lodash 利用）
    setNotes((oldNotes) => unionWith(oldNotes, newNotes, isEqual));
  };

  const getById = (id: number) => notes.find((note) => note.id === id);

  return {
    getAll: () => notes,
    set,
    getById,
  };
};
