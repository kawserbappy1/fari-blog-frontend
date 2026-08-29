"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  LogOut,
  Loader2,
  User as UserIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { User } from "@/types/auth";
import { useLogout } from "@/hooks/useLogout";

type Props = {
  user: User;
};

const UserMenu = ({ user }: Props) => {
  const router = useRouter();

  const logoutMutation = useLogout();

  // ============================================
  // User Initial
  // ============================================

  const userInitial = user.name?.trim().charAt(0).toUpperCase() || "U";

  // ============================================
  // Logout Handler
  // ============================================

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        router.push("/");
        router.refresh();
      },
    });
  };

  return (
    <DropdownMenu>
      {/* ======================================
          Avatar Trigger
      ======================================= */}

      <DropdownMenuTrigger className="relative h-10 w-10 rounded-full border-0 bg-transparent p-0 hover:bg-transparent focus:outline-none">
        <Avatar className="h-10 w-10 cursor-pointer">
          <AvatarImage
            src={user.profile?.profileImage || undefined}
            alt={user.name}
          />

          <AvatarFallback className="bg-cyan-400 font-semibold text-white">
            {userInitial}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      {/* ======================================
          Dropdown Content
      ======================================= */}

      <DropdownMenuContent align="end" className="w-64">
        {/* ======================================
            User Information
        ======================================= */}

        <div className="px-2 py-2">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">{user.name}</span>

            <span className="truncate text-xs text-muted-foreground">
              {user.email}
            </span>
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* ======================================
            Profile
        ======================================= */}

        <DropdownMenuItem asChild>
          <Link href="/profile" className="cursor-pointer flex items-center">
            <UserIcon className="mr-2 h-4 w-4" />

            <span>Profile</span>
          </Link>
        </DropdownMenuItem>

        {/* ======================================
            Dashboard
        ======================================= */}

        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="cursor-pointer flex items-center">
            <LayoutDashboard className="mr-2 h-4 w-4" />

            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* ======================================
            Logout
        ======================================= */}

        <DropdownMenuItem
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
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
