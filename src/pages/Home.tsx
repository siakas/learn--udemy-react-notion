import { useState } from "react";
import { Plus } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Home = () => {
  const [title, setTitle] = useState("");

  return (
    <Card className="m-auto w-1/2 gap-0 border-0 shadow-none">
      <CardHeader className="px-4 pb-3">
        <CardTitle className="text-lg font-medium">
          新しいノートを作成してみましょう
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="block w-full flex-1 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-slate-500 focus:ring-slate-500 focus:outline-none sm:text-sm"
            placeholder="ノートのタイトルを入力"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-slate-700 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-slate-900">
            <Plus className="size-4" />
            <span className="ml-1">ノートを作成</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Home;
