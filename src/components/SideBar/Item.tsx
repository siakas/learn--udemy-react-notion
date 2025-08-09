import type { MouseEvent, ReactElement } from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
  onIconClick?: (event: MouseEvent) => void;
  isActive?: boolean;
  trailingItem?: ReactElement;
};

export const Item = ({
  label,
  icon: Icon,
  onClick,
  onIconClick,
  isActive = false,
  trailingItem,
}: Props) => {
  return (
    <div
      role="button"
      className={cn(
        "group text-muted-foreground flex min-h-[27px] w-full cursor-pointer items-center py-1 pr-3 text-sm font-medium",
        isActive && "bg-neutral-200",
      )}
      onClick={onClick}
      style={{ paddingLeft: "12px" }}
    >
      <Icon
        onClick={onIconClick}
        className="text-muted-foreground mr-2 h-[18px] w-[18px] shrink-0"
      />
      <span className="truncate">{label}</span>
      {trailingItem}
    </div>
  );
};
