import { atom } from "recoil";

export const modalState = atom({
  key: "modalsState",
  default: {
    visible: false,
    type: "",
  },
});
