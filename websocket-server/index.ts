import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import { MessageInterface } from "../types/websocket";
import { RedisService } from "../services/RedisService";

const app = express();
const port = 3000;

const server = http.createServer(app);

const wss = new WebSocketServer({ server });
const users: {
  [key: number]: {
    room: string;
    ws: any;
  };
} = {};

var counter = 0;

wss.on("error", (error) => {
  console.error(`WebSocket Server Error: ${error.message}`);
});

wss.on("connection", (ws) => {
  console.log("user connected");
   const wsId = counter++;

  ws.on("message", async (msg: string) => {
    const message: MessageInterface = JSON.parse(msg);
    if (message.type === "join") {
      const room = message.payload.room;
      console.log(message);
         users[wsId] = {
           room,
           ws,
         };

      await RedisService.getInstance().subscribe(wsId, ws, room);
    }

    if (message.type === "message") {
      console.log(message);

      await RedisService.getInstance().publish(
        message.payload.room,
        message.payload.message
      );
    }
  });

  ws.on("close", async () => {
    if (users[wsId]) {
      console.log("user disconnected");
      delete users[wsId];

      await RedisService.getInstance().unsubscribe(
        wsId,
        users[wsId].room,
      );
    } else {
      console.log("user left without joining");
    }
  });
});

server.listen(port, () => console.log(`server listening on ${port}`));
