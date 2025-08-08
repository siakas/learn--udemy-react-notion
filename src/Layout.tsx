import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { SideBar } from "@/components/SideBar";
import { useCurrentUserStore } from "@/modules/auth/current-user.state";

export const Layout = () => {
  const { currentUser } = useCurrentUserStore();

  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);

  console.log(currentUser);

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
