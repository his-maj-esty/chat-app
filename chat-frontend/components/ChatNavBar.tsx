import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { roomMembersState } from "../states/roomMembers";
import RoomMembers from "./RoomMembers";
import OnlineUsers from "./OnlineUsers";
import OfflineUsers from "./OfflineUsers";
import { messageState } from "../states/messageState";

function ChatNavBar({ roomId }: { roomId: string }) {
    const [roomMembers, setRoomMembers] = useRecoilState(roomMembersState);
    const messages = useRecoilValue(messageState);
    
  useEffect(() => {
    async function fetchUsers() {
      const res = await axios.get("http://localhost:80/usersInRoom/" + roomId, {withCredentials: true});
        setRoomMembers(res.data.data);
        console.log("roomMembers :", roomMembers)
    }
    fetchUsers();
  }, [messages]);
    
  return (
    <div className="flex  justify-between px-3 py-3 w-full sticky top-0 bg-gray-200 text-sm z-50">
      <RoomMembers></RoomMembers>
      <div className="flex space-x-3">
        <OnlineUsers></OnlineUsers>
        <OfflineUsers></OfflineUsers>
      </div>
    </div>
  );
}

export default ChatNavBar;
