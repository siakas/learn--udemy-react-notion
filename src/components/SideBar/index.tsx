import { Plus, Search } from "lucide-react";

import { NoteList } from "@/components/NoteList";
import { Item } from "@/components/SideBar/Item";
import { UserItem } from "@/components/SideBar/UserItem";
import { authRepository } from "@/modules/auth/auth.repository";
import { useCurrentUserStore } from "@/modules/auth/current-user.state";
import { noteRepository } from "@/modules/notes/note.repository";
import { useNoteStore } from "@/modules/notes/note.state";

type Props = {
  onSearchButtonClicked: () => void;
};

export const SideBar = ({ onSearchButtonClicked }: Props) => {
  const currentUserStore = useCurrentUserStore();
  const noteStore = useNoteStore();

  const createNote = async () => {
    const newNote = await noteRepository.create(
      currentUserStore.currentUser!.id,
      {},
    );
    noteStore.set([newNote]);
  };

  const signout = async () => {
    await authRepository.signout();
    currentUserStore.set(undefined);
    // TODO: Note のリセット処理も追加する
  };

  return (
    <>
      <aside className="relative flex min-h-screen w-60 flex-col overflow-y-auto bg-neutral-100">
        <div>
          <div>
            <UserItem user={currentUserStore.currentUser!} signout={signout} />
            <Item label="検索" icon={Search} onClick={onSearchButtonClicked} />
          </div>
          <div className="mt-4">
            <NoteList />
            <Item label="ノートを作成" icon={Plus} onClick={createNote} />
          </div>
        </div>
      </aside>
      <div className="absolute top-0 left-60 z-[9999] w-[calc(100%-240px)]"></div>
    </>
  );
};
