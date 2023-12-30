import jwt from "jsonwebtoken";
import "dotenv/config";

export class token {
  private static secret: string = process.env.SECRET!;

  static get(obj: any) {
    console.log(this.secret);
    const signedToken = jwt.sign(obj, token.secret, { expiresIn: "1d" });
    return signedToken;
  }

  static verify(t: any): any {
    const unsignedToken = jwt.verify(t, token.secret);
    return unsignedToken;
  }
}