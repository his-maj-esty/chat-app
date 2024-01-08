import { atom } from "recoil";

export const cookieErrorState = atom<boolean>({
  key: "cookie",
  default: false,
});
