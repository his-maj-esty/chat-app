import express from "express";
import { dbService } from "../services/dbService";
import { token } from "../utils/token";
import cookieParser from "cookie-parser";
import { auth } from "../middlewares/auth";
import cors from "cors";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const app = express();
const PORT = 3000;

const db = new dbService();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.post("/register", async (req, res) => {
  try {
    console.log("body is :", req.body);
    const { firstName, lastName, email, password } = req.body;
    const user = await db.addUser({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });
    const signedCookie = token.get({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });
    res.cookie("details", signedCookie);
    res.status(200).send({
      message: `user with email:  ${user.email} have been registered successfully`,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof PrismaClientKnownRequestError) {
      res.status(409).json({ message: "user already registered" });
    } else {
      res.status(400).send({ message: "failed to register user" });
    }
  }
});

app.post("/login", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const isUser = await db.checkUser({
      email: email,
      password: password,
    });

    if (isUser === null) {
      res.status(404).json({ message: "user not found" });
      return;
    }

    if (isUser) {
      const signedCookie = token.get({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });
      res.cookie("details", signedCookie);
      res.status(200).send({
        message: `user with email:  ${email} have been logged in successfully`,
      });
    } else {
      res.status(401).send({ message: "incorrect password" });
    }
  } catch (error) {
    res.status(500).send({ message: "server error" });
    console.log(error);
  }
});

app.post("/createRoom", auth, async (req: any, res: any) => {
  try {
    const { roomName } = req.body;
    const { email } = req.user;
    const { id, name } = await db.createRoom({ roomName, creator: email });
    res.status(200).json({
      message: "room created successfully",
      data: { id: id, roomName: name },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "failed to create room", data: null });
  }
});

app.delete("/deleteRoom/:roomId", auth, async (req: any, res) => {
  try {
    const roomId = req.params.roomId;
    const { email } = req.user;
    const userInRoom = await db.isUserInRoom({ email, roomId });
    if (userInRoom) {
      const response = await db.deleteRoom({ roomId, email });
      res.status(200).json({
        message: "room deleted successfully",
        data: { id: response.id, roomName: response.name },
      });
    } else {
      res.status(401).json({ message: "you have not joined this room" });
    }
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      res.status(Number(error.code)).json({ message: "roomId not found" });
    } else {
      res.status(501).json({ message: "internal server error" });
    }
    console.log(error);
  }
});

app.get("/getRooms", auth, async (req: any, res: any) => {
  try {
    const { email } = req.user;
    const { rooms } = await db.getRooms({ email });
    res
      .status(200)
      .json({ message: "rooms fetched successfully", data: rooms });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
});

app.post("/getDetails", auth, async (req: any, res) => {
  try {
    const { email } = req.user;
    const details = await db.getDetails({ email });
    res.json({ message: "details fetched successfully", data: details });
  }
  catch (error) {
    res.status(501).json({ message: "server error" });
    console.log(error);
  }
})

app.post("/getMessages", auth, async (req: any, res: any) => {
  try {
    const { roomId } = req.body;
    const { email } = req.user;

    const userInRoom = await db.isUserInRoom({ email, roomId });
    if (userInRoom) {
      const messages = await db.getMessages({ roomId });
      res
        .status(200)
        .json({ message: "messages fetched successfully", data: messages });
    } else {
      res.status(401).json({ message: "you have not joined this room" });
    }
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
});

app.listen(PORT, () => console.log(`server is listening at port ${PORT}`));
