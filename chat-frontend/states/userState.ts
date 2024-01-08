import { atom } from "recoil";
import { UserType } from "../../types/db";

export const userState = atom<UserType>({
  key: "userState",
  default: {
    firstName: "",
    lastName: "",
    email: "",
  },
});
