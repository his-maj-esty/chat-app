import { atom } from "recoil";
import { RoomType } from "../../types/db";
import { roomState } from "./roomState";

export const filteredRoomsState = atom<RoomType[]>({
    key: "filtered",
    default: roomState
})