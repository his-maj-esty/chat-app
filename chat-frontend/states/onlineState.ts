import { atom } from "recoil";

export const onlineState = atom<string[]>({
    key: "onlineState",
    default: []
});