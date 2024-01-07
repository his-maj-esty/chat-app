import { atom } from "recoil";

export const clickState = atom<string>({
    key: "click",
    default: ""
});