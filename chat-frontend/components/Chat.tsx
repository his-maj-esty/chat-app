import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MessageBox from "./MessageBox";
import SendMessage from "./SendMessage";
import { useRecoilState, useRecoilValue } from "recoil";
import { MessageType } from "../../types/db";
import DateComponent from "./DateComponent";
import { messageState } from "../states/message";
axios.defaults.baseURL = "http://localhost:80";

function Chat() {
  const params = useParams();
  const roomId = params.roomId;
  const email = "newmail@dfasdc.com";
  console.log("roomID", roomId);
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useRecoilState(messageState);

  useEffect(() => {
    if (messages && messages.length > 0) {
      var prevMessage: MessageType = messages[messages.length - 1];
      console.log("Effect - prevMessage: ", prevMessage);
    }
  }, [messages]);


  useEffect(() => {
    async function fetchMessages() {
      const res = await axios.post(
        "/getMessages",
        { roomId: roomId },
        { withCredentials: true }
      );
      console.log("res:", res);
      setMessages(res.data.data);
    }
    fetchMessages();
  }, []);

  const scrollToBottom = () => {
    // @ts-ignore
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  console.log("messages: ", messages);

  if (messages.length > 0) {
    var prevMessage: MessageType = messages[messages.length - 1];
    console.log(prevMessage);
  }

  return (
    <div className="relative max-h-screen overflow-y-auto min-h-screen">
      <div
        id="serverMessages"
        className="relative flex flex-col-reverse space-y-3 pb-8 w-full min-h-screen"
      >
        {messages
          .slice()
          .reverse()
          .map((message) => {
            const DifferentDate =
              new Date(prevMessage.timestamp).getDate() !==
              new Date(message.timestamp).getDate()
                ? new Date(prevMessage.timestamp)
                : false;

            prevMessage = message;

            return (
              <>
                {DifferentDate && <DateComponent timestamp={DifferentDate} />}
                {message.sender === email ? (
                  <div className="flex justify-end max-w-screen-2xl w-full">
                    <MessageBox
                      content={message.content}
                      sender={message.sender}
                      timestamp={message.timestamp}
                    />
                  </div>
                ) : (
                  <div className="flex justify-start w-full max-w-screen-2xl">
                    <MessageBox
                      content={message.content}
                      sender={message.sender}
                      timestamp={message.timestamp}
                    />
                  </div>
                )}
                {message === messages[0] && (
                  <DateComponent timestamp={message.timestamp} />
                )}
              </>
            );
          })}
      </div>
      <div className="w-full sticky bottom-0">
        <SendMessage roomId={roomId!}></SendMessage>
      </div>
      <div ref={messagesEndRef}></div>
    </div>
  );
}

export default Chat;
