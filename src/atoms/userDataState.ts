import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

interface UserData {
  userId: string;
  accessToken: string;
}

const { persistAtom } = recoilPersist({
  key: "user",
  storage: localStorage,
});

export const userDataState = atom<UserData>({
  key: "user",
  default: {
    userId: "",
    accessToken: "",
  },
  effects_UNSTABLE: [persistAtom],
});
