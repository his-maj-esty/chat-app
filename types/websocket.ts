export interface MessageInterface {
  type: "join" | "message";
  payload: {
    message: string;
    roomId: string;
    email: string;
  };
}
