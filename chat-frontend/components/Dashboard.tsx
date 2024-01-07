import React, { useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { roomState } from "../states/roomState";
import RoomBox from "./RoomBox";
import AllRooms from "./AllRooms";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div className="flex w-screen overflow-y-scroll">
      <AllRooms />
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
