import { supabase } from "@/lib/supabase";

export const noteRepository = {
  // 新規ノートを作成
  async create(userId: string, params: { title?: string; parentId?: number }) {
    const { data, error } = await supabase
      .from("notes")
      .insert([
        {
          user_id: userId,
          title: params.title,
          parent_document: params.parentId,
        },
      ])
      .select()
      .single();
    if (error !== null) throw new Error(error.message);

    return data;
  },

  // ノートを取得
  async find(userId: string, parentDocumentId?: number) {
    const query = supabase
      .from("notes")
      .select()
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    // 親ノートがある場合は子ノートを取得
    // 親ノートがない場合はトップレベルのノートを取得
    const { data, error } =
      parentDocumentId !== undefined
        ? await query.eq("parent_document", parentDocumentId)
        : await query.is("parent_document", null);

    if (error !== null) throw new Error(error.message);

    return data;
  },

  // ID からノートを取得
  async findById(userId: string, noteId: number) {
    const { data, error } = await supabase
      .from("notes")
      .select()
      .eq("id", noteId)
      .eq("user_id", userId)
      .single();

    if (error !== null) throw new Error(error.message);

    return data;
  },
};
