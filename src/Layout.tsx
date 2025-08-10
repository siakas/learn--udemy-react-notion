import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { SideBar } from "@/components/SideBar";
import { useCurrentUserStore } from "@/modules/auth/current-user.state";
import { noteRepository } from "@/modules/notes/note.repository";
import { useNoteStore } from "@/modules/notes/note.state";

export const Layout = () => {
  const { currentUser } = useCurrentUserStore();
  const noteStore = useNoteStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);

  const fetchNotes = async () => {
    setIsLoading(true);
    const notes = await noteRepository.find(currentUser!.id);
    if (notes === null) return;
    noteStore.set(notes);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  if (!currentUser) return <Navigate replace to="/signin" />;

  return (
    <div className="flex h-full">
      {!isLoading && (
        <SideBar onSearchButtonClicked={() => setIsShowModal(true)} />
      )}
      <main className="h-full flex-1 overflow-y-auto">
        <Outlet />
        <div>サーチモーダル</div>
      </main>
    </div>
  );
};
