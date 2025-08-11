import { useState } from "react";
import { useParams } from "react-router-dom";

import { Editor } from "@/components/Editor";
import { TitleInput } from "@/components/TitleInput";
import { useCurrentUserStore } from "@/modules/auth/current-user.state";

const NoteDetail = () => {
  const params = useParams();
  const id = parseInt(params.id!);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useCurrentUserStore();

  if (isLoading) return <div></div>;

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
