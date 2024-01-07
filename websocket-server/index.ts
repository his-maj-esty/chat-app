import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import { MessageInterface } from "../types/websocket";
import { RedisService } from "../services/RedisService";
import { dbService } from "../services/dbService";
import { authenticateUser } from "../middlewares/auth";
import cookieParser from "cookie-parser";
import { extractCookie } from "../utils/extract-cookie";

const app = express();
const port = 3000;

app.use(cookieParser());
const server = http.createServer(app);

const wss = new WebSocketServer({ noServer: true });
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

        const res = await db.addMessage({
          roomId: roomId,
          message: messageObj.payload.message,
          email: email,
        });

        const ObjToSend = {
          content: res.content,
          timestamp: res.timestamp,
          sender: res.sender
        }

        await RedisService.getInstance().publish(
          roomId,
          JSON.stringify(ObjToSend)
        );
      }
    } catch (error) {
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

server.on("upgrade", async (req: any, socket, head) => {
  try {
    const details = extractCookie(req.headers.cookie, "details");
    const isValid = await authenticateUser(details);
    if (isValid) {
      wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit("connection", ws, req);
      });
    } else {
      socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
      socket.destroy();
      return;
    }
  } catch (error) {
    console.log(error);
    socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
    socket.destroy();
    return;
  }
});

server.listen(port, () => console.log(`server listening on ${port}`));
