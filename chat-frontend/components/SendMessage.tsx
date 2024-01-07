import React, { useEffect, useState } from "react";
import { Input } from "../shad/components/ui/input";
import { MessageType } from "../../types/db";
import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import { roomState } from "../states/roomState";
import { clickState } from "../states/clickState";
import { messageState } from "../states/message";

function SendMessage({ roomId }: { roomId: string }) {
  const [input, setInput] = useState("");
  const [click, setClick] = useRecoilState(clickState);
  const setMessages = useSetRecoilState(messageState);
  const [ws, setWs] = useState<WebSocket>();
  const email = "newmail@dfasdc.com";

  useEffect(() => {
    const newWs = new WebSocket("ws://localhost:80");

    newWs.onopen = () => {
      newWs.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: roomId,
          },
        })
      );
    };

    newWs.onmessage = function (event) {
      console.log("onmessage", event.data);
      const msgObj: MessageType = JSON.parse(event.data);
      setMessages((messages) => [...messages, msgObj]);
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
  }, [click]);

    function handleSend() {
        if (input) {
            if (ws) {
                ws.send(
                    JSON.stringify({
                        type: "message",
                        payload: {
                            message: input,
                            email: email,
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
    </div>
  );
}

export default SendMessage;
