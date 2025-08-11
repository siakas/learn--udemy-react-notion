import { useState, type MouseEvent } from "react";

import { cn } from "@/lib/utils";

import { NoteItem } from "@/components/NoteList/NoteItem";
import { useCurrentUserStore } from "@/modules/auth/current-user.state";
import type { Note } from "@/modules/notes/note.entity";
import { noteRepository } from "@/modules/notes/note.repository";
import { useNoteStore } from "@/modules/notes/note.state";

type Props = {
  /** 階層の深さ（インデント計算用） */
  layer?: number;
  /** 親ノートの ID（フィルタリング用） */
  parentId?: number;
};

/**
 * ノート一覧を階層構造で表示するコンポーネント
 * 再帰的に子ノートも表示し、ツリー構造を実現
 * 各ノートの展開状態を管理し、条件付きで子ノートを表示
 */
export const NoteList = ({ layer = 0, parentId }: Props) => {
  /** ノートの展開状態を管理するマップ（キー: ノートID、値: 展開状態） */
  const [isExpanded, setIsExpanded] = useState<Map<number, boolean>>(new Map());

  const noteStore = useNoteStore();
  const notes = noteStore.getAll();
  const { currentUser } = useCurrentUserStore();

  /** 子ノートを作成し、親ノートを自動的に展開 */
  const createChild = async (e: MouseEvent, parentId: number) => {
    e.stopPropagation();
    const newNote = await noteRepository.create(currentUser!.id, { parentId });
    noteStore.set([newNote]);
    // 新しい子ノートが作成されたら親ノートを展開状態にする
    setIsExpanded((prev) => prev.set(parentId, true));
  };

  /** ノートの子要素を取得してストアに追加し、展開状態を切り替え */
  const fetchChildren = async (e: MouseEvent, note: Note) => {
    e.stopPropagation();
    const children = await noteRepository.find(currentUser!.id, note.id);
    if (children === null) return;
    noteStore.set(children);
    // 展開状態の切り替え（展開 ↔ 折りたたみ）
    setIsExpanded((prev) => {
      const newMap = new Map(prev);
      newMap.set(note.id, !prev.get(note.id));
      return newMap;
    });
  };

  return (
    <>
      {/* ノートが存在しない場合のメッセージ（ルート階層では非表示） */}
      <p
        className={cn(
          "text-muted-foreground/80 hidden text-sm font-medium",
          layer === 0 && "hidden", // ルート階層（layer=0）では常に非表示
        )}
        style={{ paddingLeft: layer ? `${layer * 12 + 25}px` : undefined }} // 階層に応じたインデント
      >
        ページがありません
      </p>

      {/* 指定された親 ID に属するノートをフィルタリングして表示 */}
      {notes
        .filter((note) => note.parent_document === (parentId ?? null))
        .map((note) => (
          <div key={note.id}>
            <NoteItem
              note={note}
              layer={layer}
              isExpanded={isExpanded.get(note.id)}
              onCreate={(e) => createChild(e, note.id)}
              onExpande={(e) => fetchChildren(e, note)}
            />

            {/* 展開状態の場合のみ、再帰的に子ノートを表示（階層をひとつ深くする） */}
            {isExpanded.get(note.id) && (
              <NoteList layer={layer + 1} parentId={note.id} />
            )}
          </div>
        ))}
    </>
  );
};
