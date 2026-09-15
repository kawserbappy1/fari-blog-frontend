"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  KeyRound,
  LayoutDashboard,
  LogIn,
  LogOut,
  UserIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

const UserMenu = () => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative h-10 w-10 rounded-full border-0 bg-transparent p-0 hover:bg-transparent focus:outline-none">
        <Avatar className="h-10 w-10 cursor-pointer">
          <AvatarImage
            src="https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"
            alt="Kawser Hamid Bappy"
          />

          <AvatarFallback className="bg-cyan-400 font-semibold text-white">
            KB
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-54 sm:w-64">
        {/* User Information */}
        <div className="px-2 py-2">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Kawser Hamid Bappy</span>

            <span className="truncate text-xs text-muted-foreground">
              bappydu2015@gmail.com
            </span>
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* Profile */}
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push("/")}
        >
          <UserIcon className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>

        {/* Dashboard */}
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push("/")}
        >
          <LayoutDashboard className="mr-2 h-4 w-4" />
          <span>Dashboard</span>
        </DropdownMenuItem>

        {/* Change Password */}
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push("/")}
        >
          <KeyRound className="mr-2 h-4 w-4" />
          <span>Change Password</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        {/* <DropdownMenuItem
          disabled={logoutMutation.isPending}
          onClick={handleLogout}
          className="cursor-pointer text-red-500 focus:text-red-500"
        >
          {logoutMutation.isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="mr-2 h-4 w-4" />
          )}

          <span>{logoutMutation.isPending ? "Logging out..." : "Logout"}</span>
        </DropdownMenuItem> */}
        <DropdownMenuItem>
          <div className="flex text-red-500">
            <LogOut className="mr-2 h-4 w-4" />
            <span>logout</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
