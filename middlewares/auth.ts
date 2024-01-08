import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { dbService } from "../services/dbService";
import { token } from "../utils/token";

const db = new dbService();

export async function auth(req: any, res: any, next: any) {
  try {
    const encryptedDetails = req.cookies.details;
    console.log(encryptedDetails, "cookie");
    const decrypted = token.verify(encryptedDetails);
    console.log(decrypted, "decrypted");
    const { email, password } = decrypted;
    console.log("email:", email, password);
    req.user = { email: email };
    console.log(req.user, "req,user");
    const isUser = await db.checkUser({ email, password });
    if (isUser) {
      next();
    } else {
      res.status(401).json({ message: "unauthorized user" });
    }
  } catch (err) {
    console.log(err);
    if (err instanceof TokenExpiredError) {
      res.status(440).json({ message: "cookie expired. login again" });
      return;
    }
    if (err instanceof JsonWebTokenError) {
      res.status(400).json({ message: "cookie undefined" });
    }
  }
}

export async function authenticateUser(details: string) {
  try {
    const { email, password } = token.verify(details);
    const isUser = await db.checkUser({ email, password });
    if (isUser) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}
