import express from "express";
import { dbService } from "../services/dbService";
import { token } from "../utils/token";
import cookieParser from "cookie-parser";
import { auth } from "../middlewares/auth";

const app = express();
const PORT = 3000;

const db = new dbService();

app.use(cookieParser());
app.use(express.json());

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
    res.status(400).send({ message: "failed to register user" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const isUser = await db.checkUser({
      email: email,
      password: password,
    });

    if (isUser) {
      const signedCookie = token.get({
        firstName: firstName,
        lastName: lastName,
        email: email,
      });
      res.cookie("details", signedCookie);
      res.status(200).send({
        message: `user with email:  ${email} have been logged in successfully`,
      });
    } else {
      res.status(400).send({ message: "invalid user" });
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
    res.status(400).json({ message: "failed to create room" });
  }
});

app.listen(PORT, () => console.log(`server is listening at port ${PORT}`));
