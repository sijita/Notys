import { atom } from "recoil";

interface noteState {
  title: string;
  content: string;
}

export const notesState = atom<noteState>({
  key: "noteState",
  default: {
    title: "",
    content: "",
  },
});
