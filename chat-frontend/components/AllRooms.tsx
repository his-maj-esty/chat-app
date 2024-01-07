import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { roomState } from "../states/roomState";
import axios from "axios";
import RoomBox from "./RoomBox";
import { CreateRoom } from "./CreateRoom";
import SearchComponent from "./SearchComponent";
import { filteredRoomsState } from "../states/filteredRooms";

function AllRooms() {
  const [rooms, setRooms] = useRecoilState(roomState);
  const filteredRooms = useRecoilValue(filteredRoomsState);

  useEffect(() => {
    async function fetchRooms() {
      const res = await axios.get("http://localhost:80/getRooms", {
        withCredentials: true,
      });
      const r = res.data.data;
      setRooms(r);
    }

    fetchRooms();
  }, []);
  return (
    <div className="relative bg-gray-100 min-h-screen w-2/5 max-h-screen overflow-y-auto">
      <div className="sticky top-0 z-10 py-3 bg-gray-100 px-4">
        <div className="flex justify-between py-2 rounded-lg">
          <div className="text-xl font-bold">Chats</div>
          <CreateRoom />
        </div>
        <SearchComponent />
      </div>

      <div className="flex flex-col-reverse space-y-2 mt-4 px-4">
        {filteredRooms.map((room) => (
          <RoomBox roomName={room.name} roomId={room.id} />
        ))}
      </div>
    </div>
  );
}

export default AllRooms;
