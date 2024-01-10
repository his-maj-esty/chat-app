import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../shad/components/ui/dropdown-menu";
import { useRecoilValue } from "recoil";
import { roomMembersState } from "../states/roomMembers";
import { onlineState } from "../states/onlineState";

function OfflineUsers() {
  const roomMembers = useRecoilValue(roomMembersState);
  const onlineUsers = useRecoilValue(onlineState);

  const offlineUsers = roomMembers.filter((member) =>
    !onlineUsers.some((email) => email === member.email)
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button className="flex items-center space-x-2 bg-red-200 w-fit px-3 rounded-full ">
          <div className="bg-red-400 h-2 w-2 rounded-full"></div>
          <div>{offlineUsers.length}</div>
          <div>Offline</div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        <DropdownMenuLabel>Members</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {offlineUsers.map((user) => (
          <div>
            <DropdownMenuItem>{user.firstName}</DropdownMenuItem>
          </div>
        ))}
        {offlineUsers.length === 0 && (
          <DropdownMenuItem>
            <div className="text-sm text-gray-400">No members offline</div>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default OfflineUsers;
