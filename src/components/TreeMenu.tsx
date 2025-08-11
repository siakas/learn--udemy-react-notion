import { useState } from "react";
import { ChevronDown, ChevronRight, File } from "lucide-react";

import { cn } from "@/lib/utils";

export type MenuItem = {
  id: string;
  label: string;
  children?: MenuItem[]; // 子要素（同じ型の配列）
};

type Props = {
  item: MenuItem;
  depth?: number;
};

export const TreeMenu = ({ item, depth = 0 }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="ml-[1.5rem]">
      <div
        onClick={() => hasChildren && setIsOpen(!isOpen)}
        className={cn(
          "flex items-center p-1 select-none",
          hasChildren ? "cursor-pointer" : "cursor-default",
        )}
      >
        {hasChildren ? (
          <span className="mr-1">
            {isOpen ? <ChevronDown /> : <ChevronRight />}
          </span>
        ) : (
          <span className="mr-1">
            <File />
          </span>
        )}
        {item.label}
      </div>

      {/* ここで自分自身（TreeMenu）を再帰的に呼び出し */}
      {isOpen && item.children && (
        <div>
          {item.children.map((child) => (
            <TreeMenu key={child.id} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};
