import { useState } from "react";
import { Outlet } from "react-router-dom";

import { SideBar } from "@/components/SideBar";

export const Layout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);

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
