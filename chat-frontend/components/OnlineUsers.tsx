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
import { Button } from "../shad/components/ui/button";
import { onlineState } from "../states/onlineState";

function OnlineUsers() {
  const roomMembers = useRecoilValue(roomMembersState);
  const onlineUsers = useRecoilValue(onlineState);

  const users = roomMembers.filter((member) =>
    onlineUsers.some((email) => email === member.email)
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center space-x-2 bg-green-200 w-fit px-3 rounded-full focus: ">
          <div className="bg-green-400 h-2 w-2 rounded-full"></div>
          <div>{users.length}</div>
          <div>Online</div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        <DropdownMenuLabel>Members</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {users.map((user) => (
          <div>
            <DropdownMenuItem className="hover:bg-slate-500">{user.firstName}</DropdownMenuItem>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default OnlineUsers;
