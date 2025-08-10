import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCurrentUserStore } from "@/modules/auth/current-user.state";
import { noteRepository } from "@/modules/notes/note.repository";
import { useNoteStore } from "@/modules/notes/note.state";

const Home = () => {
  const [title, setTitle] = useState("");
  const { currentUser } = useCurrentUserStore();
  const noteStore = useNoteStore();

  const createNote = async () => {
    const newNote = await noteRepository.create(currentUser!.id, { title });
    noteStore.set([newNote]);
    setTitle("");
  };

  return (
    <Card className="m-auto w-1/2 gap-0 border-0 shadow-none">
      <CardHeader className="px-4 pb-3">
        <CardTitle className="text-lg font-medium">
          新しいノートを作成してみましょう
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="ノートのタイトルを入力"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button onClick={createNote} disabled={!title.trim()}>
            <Plus className="size-4" />
            ノートを作成
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Home;
