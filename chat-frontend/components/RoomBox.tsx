import React from "react";
import Avt from "./Avatar";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { clickState } from "../states/clickState";
import axios from "axios";
import { roomState } from "../states/roomState";
import { filteredRoomsState } from "../states/filteredRooms";

function RoomBox({ roomName, roomId }: { roomName: string; roomId: string }) {
  const navigate = useNavigate();
  const setRooms = useSetRecoilState(roomState);
  const setFilteredRooms = useSetRecoilState(filteredRoomsState);
  const [click, setClick] = useRecoilState(clickState);

 async function handleJoin(roomId: string) {
    setClick(roomId);
    navigate("/dashboard/" + roomId);
  }

  async function handleDelete() {
    const response = await axios.delete("http://localhost:80/deleteRoom/" + roomId ,{
      withCredentials: true,
    });
    const rooms = await axios.get("http://localhost:80/getRooms", {
      withCredentials: true,
    });

    setRooms(rooms.data.data);
    setFilteredRooms(rooms.data.data);

  }

  return (
    <div
      className={`flex justify-between w-full group p-3  drop-shadow-lg rounded-2xl bg-white border-2 ${
        click === roomId
          ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white"
          : "bg-white text-black"
      }`}
    >
      <div
        className={`font-bold ${
          click === roomId
            ? ""
            : "group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:transition group-hover:text-transparent"
        }`}
      >
        {roomName}
      </div>
      <div className="flex space-x-4 items-center">
        <button
          className={`group-hover:visible invisible hover:bg-purple-500 p-1  hover:transition rounded-lg ${
            click === roomId ? "text-white" : "text-black hover:text-white"
          }`}
          onClick={handleDelete}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-4 h-4 rounded-md"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
        <button
          className="font-bold group-hover:transition group-hover:translate-x-1"
          onClick={() => handleJoin(roomId)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default RoomBox;
