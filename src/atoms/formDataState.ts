import { atom } from "recoil";

interface LoginData {
  email: string;
  password: string;
}

export const formDataState = atom<LoginData>({
  key: "loginData",
  default: {
    email: "",
    password: "",
  },
});
