import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Editor } from "@/components/Editor";
import { TitleInput } from "@/components/TitleInput";
import { useCurrentUserStore } from "@/modules/auth/current-user.state";
import { noteRepository } from "@/modules/notes/note.repository";
import { useNoteStore } from "@/modules/notes/note.state";

/**
 * ノート詳細ページ
 * URL パラメータの ID に基づいて特定のノートを表示・編集する
 */
const NoteDetail = () => {
  const params = useParams();
  const { currentUser } = useCurrentUserStore();
  const noteStore = useNoteStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // URL パラメータからノート ID を取得（型安全性を考慮）
  const id = params.id ? parseInt(params.id, 10) : null;
  const note = id ? noteStore.getById(id) : null;

  /**
   * 指定 ID のノートを API から取得してストアに保存
   */
  const fetchById = useCallback(async () => {
    if (!id || !currentUser) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const note = await noteRepository.findById(currentUser.id, id);
      if (note === null) {
        setError("ノートが見つかりません");
      } else {
        noteStore.set([note]);
      }
    } catch (err) {
      setError("ノートの取得に失敗しました");
      console.error("Failed to fetch note:", err);
    } finally {
      setIsLoading(false);
    }
  }, [id, currentUser]);

  const updateNote = async (
    id: number,
    note: { title?: string; content?: string },
  ) => {
    const updatedNote = await noteRepository.update(id, note);
    if (updatedNote === null) return;
    noteStore.set([updatedNote]);
    return updatedNote;
  };

  useEffect(() => {
    fetchById();
  }, [fetchById]);

  // URL パラメータが無効な場合
  if (id === null) return <div>無効なノートIDです</div>;

  // ローディング中の表示
  if (isLoading) return <div>Loading...</div>;

  // エラーが発生した場合の表示
  if (error) return <div>{error}</div>;

  // ノートが見つからない場合の表示（ストア内に存在しない）
  if (note === null || note === undefined)
    return <div>ノートが見つかりません</div>;

  return (
    <div className="pt-20 pb-40">
      <div className="mx-auto md:max-w-3xl lg:max-w-4xl">
        <TitleInput
          initialData={note}
          onTitleChange={(title) => updateNote(id, { title })}
        />
        <Editor />
      </div>
    </div>
  );
};

export default NoteDetail;
