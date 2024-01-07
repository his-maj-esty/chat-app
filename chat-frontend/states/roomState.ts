import { atom } from "recoil";
import { RoomType } from "../../types/db";

export const roomState = atom<RoomType[]>({
  key: "roomState",
  default: [],
});
