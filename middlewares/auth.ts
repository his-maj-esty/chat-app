import { dbService } from "../services/dbService";
import { token } from "../utils/token";

const db = new dbService();

export async function auth(req: any, res: any, next: any) {
  const encryptedDetails = req.cookies.details;
  const { email, password } = token.verify(encryptedDetails);
  req.user = { email: email };
  const isUser = await db.checkUser({ email, password });
  if (isUser) {
    next();
  } else {
    res.status(401).json({ message: "unauthorized user" });
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
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
