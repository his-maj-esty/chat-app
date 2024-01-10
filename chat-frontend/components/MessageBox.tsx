import React from "react";
import Avt from "./Avatar";
import { useRecoilValue } from "recoil";
import { userState } from "../states/userState";

function MessageBox({
  content,
  sender,
  timestamp,
}: {
  content: string;
  sender: string;
  timestamp: Date;
  }) {
  const user = useRecoilValue(userState);
  return (
    <div className="flex">
      <div className="flex flex-col">
        <div className="flex flex-col break-all text-white w-full bg-gradient-to-r from-[#784AF7] to-[#B748FE] px-8 py-4 rounded-3xl max-h-screen  max-w-72  text-end">
          <div>{content}</div>
        </div>
        <div className="flex justify-between w-full text-end text-xs text-gray-600 pr-5 space-x-2">
          <div>{sender === user.email ? "" : sender.split("@")[0]}</div>
          <div> {getTime(timestamp)}</div>
        </div>
      </div>
    </div>
  );
}

function getTime(timestamp: Date) {
  const dateObj = new Date(timestamp);
  const hours = dateObj.getHours().toString();
  const minutes = dateObj.getMinutes().toString();
  const formattedMin = minutes.length === 1 ? "0" + minutes : minutes;
  return `${hours}:${formattedMin}`;
}

export default MessageBox;
