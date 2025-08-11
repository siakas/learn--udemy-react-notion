import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Editor } from "@/components/Editor";
import { TitleInput } from "@/components/TitleInput";
import { useCurrentUserStore } from "@/modules/auth/current-user.state";
import { noteRepository } from "@/modules/notes/note.repository";
import { useNoteStore } from "@/modules/notes/note.state";

const NoteDetail = () => {
  const params = useParams();
  const id = parseInt(params.id!);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useCurrentUserStore();
  const noteStore = useNoteStore();
  const note = noteStore.getById(id);

  const fetchById = async () => {
    setIsLoading(true);
    const note = await noteRepository.findById(currentUser!.id, id);
    if (note === null) return;
    noteStore.set([note]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchById();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;

  if (note === undefined) return <div>ノートが見つかりません</div>;

  return (
    <div className="pt-20 pb-40">
      <div className="mx-auto md:max-w-3xl lg:max-w-4xl">
        <p>{id}</p>
        <TitleInput />
        <Editor />
      </div>
    </div>
  );
};

export default NoteDetail;
