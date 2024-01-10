import React, { useEffect, useState } from "react";
import { Input } from "../shad/components/ui/input";
import { MessageType } from "../../types/db";
import axios from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { clickState } from "../states/clickState";
import { messageState } from "../states/messageState";
import { userState } from "../states/userState";
import { onlineState } from "../states/onlineState";
import OnlineUsers from "./OnlineUsers";
import toast, { Toaster } from "react-hot-toast";

function SendMessage({ roomId }: { roomId: string }) {
  const [input, setInput] = useState("");
  const [click, setClick] = useRecoilState(clickState);
  const setMessages = useSetRecoilState(messageState);
  const [onlineUsers, setOnlineUsers] = useRecoilState(onlineState);
  const [ws, setWs] = useState<WebSocket>();
  const user = useRecoilValue(userState);
  useEffect(() => {
    console.log("updated onlineUsers:", onlineUsers);
    setOnlineUsers([]);
  }, [click, user]);

  useEffect(() => {
    if (user.email !== "") {
      const newWs = new WebSocket("ws://localhost:80");

      newWs.onopen = () => {
        newWs.send(
          JSON.stringify({
            type: "join",
            payload: {
              roomId: roomId,
              email: user.email,
            },
          })
        );
      };

      newWs.onmessage = function (event) {
        console.log("onmessage", event.data);
        const msgObj: MessageType = JSON.parse(event.data);
        if (msgObj.type === "message" || msgObj.type === "newJoin") {
          setMessages((messages) => [...messages, msgObj]);
        }
        if (msgObj.type === "join") {
          console.log("joined");
          toast.success(msgObj.sender + " joined");
          setOnlineUsers((prev) => [...prev, msgObj.sender]);
          console.log(onlineState);
        }
        if (msgObj.type === "close") {
          console.log("left");
          toast.success(msgObj.sender + " left");

          setOnlineUsers((onlineUsers) =>
            onlineUsers.filter((email) => email !== msgObj.sender)
          );
        }
      };
      setWs(newWs);

      async function fetchMessages() {
        const res = await axios.post(
          "/getMessages",
          { roomId: roomId },
          { withCredentials: true }
        );
        setMessages(res.data.data);
      }
      fetchMessages();

      return () => {
        newWs.close();
      };
    }
  }, [click, user]);

  function handleSend() {
    if (input) {
      if (ws) {
        ws.send(
          JSON.stringify({
            type: "message",
            payload: {
              message: input,
              email: user.email,
              roomId: roomId,
            },
          })
        );
        setInput("");
      } else {
        console.log("failed to make connection");
      }
    }
  }
  return (
    <div className="flex bg-white p-2 shadow-2xl z-10">
      <Input
        className="rounded-3xl mx-6"
        placeholder="Type a message here..."
        onChange={(event) => setInput(event.target.value)}
        value={input}
      />
      <button
        onClick={handleSend}
        type="submit"
        className="rounded-full p-2 text-white bg-gradient-to-tr from-[#784AF7] to-[#B748FE]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
          />
        </svg>
      </button>
      <div>
        <Toaster position="bottom-left" reverseOrder={false} />
      </div>
    </div>
  );
}

export default SendMessage;
