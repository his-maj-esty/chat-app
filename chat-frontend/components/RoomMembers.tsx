import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../shad/components/ui/dropdown-menu";
import { useRecoilValue } from 'recoil';
import { roomMembersState } from '../states/roomMembers';
import { Button } from '../shad/components/ui/button';


function RoomMembers() {
  const roomMembers = useRecoilValue(roomMembersState);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button
          className="bg-purple-500 text-white px-4 py-1 rounded-xl hover:bg-purple-400"
          onClick={() => {}}
        >
          Room Members
        </button>
      </DropdownMenuTrigger>
      <div className='bg-white'>
        <DropdownMenuContent>
          <DropdownMenuLabel>Members</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {roomMembers.map((member) => (
            <div>
              <DropdownMenuItem>{member.firstName}</DropdownMenuItem>
            </div>
          ))}
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  );
}

export default RoomMembers;