import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { roomState } from "../states/roomState";
import axios from "axios";
import RoomBox from "./RoomBox";
import { CreateRoom } from "./CreateRoom";
import SearchComponent from "./SearchComponent";
import { filteredRoomsState } from "../states/filteredRooms";
import { Divide } from "lucide-react";
import CreateFirstRoom from "./CreateFirstRoom";

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
    <div className="relative bg-gray-100  w-2/5 overflow-y-auto min-h-[90vh]">
      <div className="sticky top-0 z-10 py-3 bg-gray-100 px-4">
        <div className="flex justify-between py-2 rounded-lg">
          <div className="text-xl font-bold">Chats</div>
          <CreateRoom />
        </div>
        <SearchComponent />
      </div>
      {filteredRooms.length === 0 && <CreateFirstRoom />}
      <div className="flex flex-col-reverse space-y-2 mt-4 px-4">
        {filteredRooms.map((room) => (
          <RoomBox roomName={room.name} roomId={room.id} />
        ))}
      </div>
    </div>
  );
}

export default AllRooms;
