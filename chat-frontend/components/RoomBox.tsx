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
  const [click, setClick] = useRecoilState(clickState);

  async function handleJoin(roomId: string) {
    setClick(roomId);
    navigate("/dashboard/" + roomId);
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
  );
}

export default RoomBox;
