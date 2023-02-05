import { useEffect } from "react";
import { callsResponse } from "../atoms/callsResponse";
import { useRecoilState } from "recoil";

export default function useCallResponse() {
  const [callResponse, setCallResponse] = useRecoilState(callsResponse);

  useEffect(() => {
    setTimeout(() => {
      setCallResponse("");
    }, 3000);
  }, [callResponse]);
  return { callResponse, setCallResponse };
}
