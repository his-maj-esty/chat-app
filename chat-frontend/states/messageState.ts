import { atom } from "recoil";
import { MessageType } from "../../types/db";

export const messageState = atom<MessageType[]>({
  key: "messageState",
  default: [],
});
