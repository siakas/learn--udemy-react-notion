type Props = {
  onSearchButtonClicked: () => void;
};

export const SideBar = ({ onSearchButtonClicked }: Props) => {
  return (
    <>
      <aside className="relative flex h-full w-60 flex-col overflow-y-auto bg-neutral-100">
        <div>
          <div>
            <div>ユーザーアイテム</div>
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
