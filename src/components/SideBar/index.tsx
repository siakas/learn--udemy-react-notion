import { UserItem } from "@/components/SideBar/UserItem";
import { useCurrentUserStore } from "@/modules/auth/current-user.state";

type Props = {
  onSearchButtonClicked: () => void;
};

export const SideBar = ({ onSearchButtonClicked }: Props) => {
  const currentUserStore = useCurrentUserStore();

  return (
    <>
      <aside className="relative flex h-full w-60 flex-col overflow-y-auto bg-neutral-100">
        <div>
          <div>
            <UserItem user={currentUserStore.currentUser!} />
            <div>アイテム</div>
          </div>
          <div className="mt-4">
            <div>ノートリスト</div>
            <div>アイテム</div>
          </div>
        </div>
      </aside>
      <div className="absolute top-0 left-60 z-[9999] w-[calc(100%-240px)]"></div>
    </>
  );
};
