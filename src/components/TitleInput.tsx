import { useState } from "react";
import TextAreaAutoSize from "react-textarea-autosize";

import type { Note } from "@/modules/notes/note.entity";

type Props = {
  initialData: Note;
  onTitleChange: (title: string) => void;
};

export const TitleInput = ({ initialData, onTitleChange }: Props) => {
  const [value, setValue] = useState(initialData.title ?? "無題");

  return (
    <div className="relative pl-[54px]">
      <TextAreaAutoSize
        className="resize-none bg-transparent text-5xl font-bold break-words text-[#3F3F3F] outline-none"
        value={value}
      />
    </div>
  );
};
