import { supabase } from "@/lib/supabase";

// 新規ノートを作成
export const noteRepository = {
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
};
