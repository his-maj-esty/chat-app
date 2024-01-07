import React from "react";
import Avt from "./Avatar";

function MessageBox({ content, sender,timestamp }: { content: string; sender: string, timestamp:Date }) {
  return (
  <div className="flex">
      <div>
        <Avt email={sender}></Avt>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col break-all text-white w-full bg-gradient-to-r from-[#784AF7] to-[#B748FE] px-8 py-4 rounded-3xl max-h-screen  max-w-64  text-end">
          <div>{content}</div>
        </div>
        <div className="w-full text-end text-xs text-gray-600 pr-5">{getTime(timestamp)}</div>
      </div>
    </div>
  );
}

function getTime(timestamp: Date) {
  const dateObj = new Date(timestamp);
  const hours = dateObj.getHours().toString();
  const minutes = dateObj.getMinutes().toString();
  const formattedMin = minutes.length === 1 ? '0' + minutes : minutes;
  return `${hours}:${formattedMin}`;
}

export default MessageBox;
