import { useState, type MouseEvent } from "react";
import {
  ChevronDown,
  ChevronRight,
  File,
  MoreHorizontal,
  Plus,
  Trash,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Item } from "@/components/SideBar/Item";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Note } from "@/modules/notes/note.entity";

type Props = {
  /** 表示するノートオブジェクト */
  note: Note;
  /** ノートが展開されているかどうか */
  isExpanded?: boolean;
  /** 階層の深さ（インデント計算用） */
  layer?: number;
  /** 子ノート作成ボタンクリック時のハンドラー */
  onCreate?: (event: MouseEvent) => void;
  /** 展開アイコンクリック時のハンドラー */
  onExpande?: (event: MouseEvent) => void;
};

/**
 * ノート一覧の各アイテムを表示するコンポーネント
 * ホバー時にメニューボタンと子ノート作成ボタンを表示し、階層構造をサポート
 */
export const NoteItem = ({
  note,
  isExpanded = false,
  layer = 0,
  onCreate,
  onExpande,
}: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  // ノートの状態に応じてアイコンを切り替え
  const getIcon = () => {
    return isExpanded ? ChevronDown : isHovered ? ChevronRight : File;
  };

  // ホバー時に表示されるメニュー（削除ボタンと子ノート作成ボタン）
  const menu = (
    <div
      className={cn(
        "ml-auto flex items-center gap-x-2",
        !isHovered && "opacity-0",
      )}
    >
      {/* ドロップダウンメニュー（削除など） */}
      <DropdownMenu>
        <DropdownMenuTrigger onClick={(e) => e.stopPropagation()}>
          <div
            role="button"
            className="ml-auto h-full cursor-pointer rounded-sm hover:bg-neutral-300"
          >
            <MoreHorizontal className="text-muted-foreground size-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-60"
          align="start"
          side="right"
          forceMount
        >
          <DropdownMenuItem className="cursor-pointer">
            <Trash className="mr-2 size-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* 子ノート作成ボタン */}
      <div
        role="button"
        className="ml-auto h-full rounded-sm hover:bg-neutral-300"
        onClick={onCreate}
      >
        <Plus className="text-muted-foreground size-4" />
      </div>
    </div>
  );

  return (
    <div
      role="button"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ paddingLeft: layer !== 0 ? `${layer * 12}px` : "0" }} // 階層に応じたインデント
    >
      <Item
        label={note.title ?? "無題"}
        icon={getIcon()}
        onIconClick={onExpande}
        isActive={isHovered}
        trailingItem={menu}
      />
    </div>
  );
};
