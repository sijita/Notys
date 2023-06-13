import { atom } from "recoil";

interface CallResponse {
  message: string;
  error: boolean;
}

export const callsResponse = atom<CallResponse>({
  key: "callResponse",
  default: {
    message: "",
    error: false,
  },
});
