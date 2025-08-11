import type { Note } from "@/modules/notes/note.entity";

type Props = {
  initialData: Note;
  onTitleChange: (title: string) => void;
};

export const TitleInput = ({ initialData, onTitleChange }: Props) => {
  return <div className="relative pl-[54px]">TitleInput</div>;
};
