"use client";

import { Session } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Moon, Settings, Sun, Truck } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Switch } from "../ui/switch";

const UserButton = ({ user }: Session) => {
  const { setTheme, theme } = useTheme();
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  function setSwitchState() {
    switch (theme) {
      case "dark":
        console.log(theme);
        return setChecked(true);
      case "light":
        console.log(theme);
        return setChecked(false);
      case "system":
        return setChecked(false);
    }
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <Avatar className="w-7 h-7">
          {user?.image && (
            <Image src={user.image} alt={user.name!} fill={true} />
          )}
          {!user?.image && (
            <AvatarFallback className="bg-primary/25">
              <div className="font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            </AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 p-6" align="end">
        <DropdownMenuLabel>
          <div className="flex mb-4 flex-col p-4 gap-1 items-center rounded-lg bg-primary/10 ">
            {user?.image && (
              <Image
                src={user.image}
                alt={user.name!}
                height={36}
                width={36}
                className="rounded-full"
              />
            )}
            <p className="font-bold text-xs">{user?.name}</p>
            <span className="text-xs font-medium tetx-secondary-foreground">
              {user?.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => router.push("/dashboard/orders")}
          className="group font-medium cursor-pointer  ease-out"
        >
          <Truck className="mr-2 group-hover:translate-x-1 transition-all duration-300" />
          My orders
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push("/dashboard/settings")}
          className="group font-medium  ease-in-out"
        >
          <Settings className="mr-2 group-hover:rotate-180 translate-all duration-300 ease-out" />
          Settings
        </DropdownMenuItem>

        {theme && (
          <DropdownMenuItem className="py-2 font-medium cursor-pointer  ease-in-out">
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center group "
            >
              <div className="relative flex mr-3">
                {theme === "dark" && (
                  <Moon
                    className="group-hover:text-blue-400  scale-0 rotate-90 dark:rotate-0  dark:scale-100 transition-all ease-in-out duration-750"
                    size={14}
                  />
                )}
                {theme === "light" && (
                  <Sun
                    className="group-hover:text-yellow-600  absolute group-hover:rotate-180  dark:scale-0 dark:-rotate-90 transition-all duration-750 ease-in-out"
                    size={14}
                  />
                )}
              </div>
              <p className="dark:text-blue-400 mr-3    text-yellow-600">
                {theme[0].toUpperCase() + theme.slice(1)} Mode
              </p>
              <Switch
                className="scale-75 "
                checked={checked}
                onCheckedChange={(e) => {
                  setChecked((prev) => !prev);
                  if (e) setTheme("dark");
                  if (!e) setTheme("light");
                }}
              />
            </div>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          className="py-2 focus:bg-destructive/30 group font-medium cursor-pointer transition-all duration-500 ease-in-out "
          onClick={() => signOut()}
        >
          <LogOut className="mr-2 group-hover:scale-80 translate-all duration-300 ease-out" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
