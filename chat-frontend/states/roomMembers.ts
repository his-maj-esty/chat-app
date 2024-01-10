import { atom } from "recoil";
import { UserType } from "../../types/db";

export const roomMembersState = atom<UserType[]>({
    key: "roomMembers",
    default: []
}) 