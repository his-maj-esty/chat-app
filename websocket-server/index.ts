import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import { MessageInterface } from "../types/websocket";
import { RedisService } from "../services/RedisService";
import { dbService } from "../services/dbService";

const app = express();
const port = 3000;

const server = http.createServer(app);

const wss = new WebSocketServer({ server });
const users: {
  [key: number]: {
    roomId: string;
    ws: any;
    email: string;
  };
} = {};

var counter = 0;

wss.on("error", (error) => {
  console.error(`WebSocket Server Error: ${error.message}`);
});

const db = new dbService();
wss.on("connection", (ws) => {
  console.log("user connected");
  const wsId = counter++;

  ws.on("message", async (msg: string) => {
    const messageObj: MessageInterface = JSON.parse(msg);
    const roomId = messageObj.payload.roomId;
    const email = messageObj.payload.email;
    try {
      if (messageObj.type === "join") {
        console.log(messageObj);
        users[wsId] = {
          roomId,
          ws,
          email,
        };
        await RedisService.getInstance().subscribe(wsId, ws, roomId);
      }
      if (messageObj.type === "message") {
        console.log(messageObj);
        await RedisService.getInstance().publish(
          roomId,
          messageObj.payload.message
        );

        await db.addMessage({
          roomId: roomId,
          message: messageObj.payload.message,
          email: email,
        });
      }
    }
    catch (error) {
      console.log(error);
      ws.send("error occurred");
      ws.close();
    }
  });

  ws.on("close", async () => {
    if (users[wsId]) {
      console.log("user disconnected");
      await RedisService.getInstance().unsubscribe(wsId, users[wsId].roomId);
      delete users[wsId];
    } else {
      console.log("user left without joining");
    }
  });
});

server.listen(port, () => console.log(`server listening on ${port}`));
