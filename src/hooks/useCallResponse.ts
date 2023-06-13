import { useEffect } from "react";
import { callsResponse } from "../atoms/callsResponse";
import { useRecoilState } from "recoil";

export default function useCallResponse() {
  const [callResponse, setCallResponse] = useRecoilState(callsResponse);

  useEffect(() => {
    setTimeout(() => {
      setCallResponse({ message: "", error: false });
    }, 5000);
  }, [callResponse]);
  return { callResponse, setCallResponse };
}
