import React, { useEffect } from "react";
import AllRooms from "./AllRooms";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div className="flex w-screen overflow-y-scroll max-h-[90vh]">
      <AllRooms />
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
