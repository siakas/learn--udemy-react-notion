import { useEffect, useState } from "react";
import TextAreaAutoSize from "react-textarea-autosize";

import { useDebounce } from "@/hooks/useDebounce";

import type { Note } from "@/modules/notes/note.entity";

type Props = {
  initialData: Note;
  onTitleChange: (title: string) => void;
};

export const TitleInput = ({ initialData, onTitleChange }: Props) => {
  const [value, setValue] = useState(initialData.title ?? "無題");
  const debouncedValue = useDebounce(value, 500);

  // 初期データが変更された際の同期処理
  useEffect(() => {
    setValue(initialData.title ?? "無題");
  }, [initialData.title]);

  // デバウンスされた値が変更された時のみ API を呼び出す
  useEffect(() => {
    // 初期値と同じ場合は API 呼び出しをスキップ
    if (debouncedValue !== (initialData.title ?? "無題")) {
      onTitleChange(debouncedValue);
    }
  }, [debouncedValue, initialData.title, onTitleChange]);

  return (
    <div className="relative pl-[54px]">
      <TextAreaAutoSize
        className="resize-none bg-transparent text-5xl font-bold break-words text-[#3F3F3F] outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
