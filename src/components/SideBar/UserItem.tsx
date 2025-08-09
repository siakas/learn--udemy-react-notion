import type { User } from "@supabase/supabase-js";
import { ChevronsLeftRight, LogOut } from "lucide-react";

import { Item } from "@/components/SideBar/Item";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  user: User;
  signout: () => void;
};

export const UserItem = ({ user, signout }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className="hover:bg-primary/5 flex w-full cursor-pointer items-center p-3 text-sm"
        >
          <div className="flex max-w-[150px] items-center gap-x-2">
            <span className="line-clamp-1 text-start font-medium">
              {user.user_metadata.name}
              <span className="ml-1">さんのノート</span>
            </span>
          </div>
          <ChevronsLeftRight className="text-muted-foreground ml-2 size-4 rotate-90" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80"
        align="start"
        alignOffset={11}
        forceMount
      >
        <div className="flex flex-col space-y-4 p-2">
          <p className="text-muted-foreground text-xs leading-none font-medium">
            {user.email}
          </p>
          <div className="flex items-center gap-x-2">
            <div className="space-y-1">
              <p className="line-clamp-1 text-sm">{user.user_metadata.name}</p>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Item label="ログアウト" icon={LogOut} onClick={signout} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
