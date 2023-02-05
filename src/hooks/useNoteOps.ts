import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "../atoms/modalState";
import { axiosClient } from "../services/apiClient";
import Note from "../types/note";
import { mutate } from "swr";
import { toast } from "react-hot-toast";
import { notesFilterState } from "../atoms/notesFilterState";

export default function useAddNote() {
  const [modal, setModal] = useRecoilState(modalState);
  const order = useRecoilValue(notesFilterState);

  const addNote = async (note: Note, user: any, setCallResponse: any) => {
    try {
      await axiosClient.post("rest/v1/Notes", {
        title: note.title,
        content: note.content,
        user_id: user,
      });

      mutate(`rest/v1/Notes?user_id=eq.${user}${order}`);
      setModal({ visible: false, type: "" });
      toast.success("Nota agregada correctamente", {
        duration: 5000,
        className: "bg-[#333] text-white",
      });
    } catch (error: any) {
      toast.error(error.response.data.message, {
        duration: 5000,
        className: "bg-[#333] text-white",
      });
    }
  };

  const editNote = async (
    id: string | undefined,
    note: Note,
    user: any,
    setCallResponse: any
  ) => {
    try {
      await axiosClient.patch(`rest/v1/Notes?id=eq.${id}`, {
        title: note.title,
        content: note.content,
        user_id: user,
      });
      setModal({ visible: false, type: "" });
      mutate(`rest/v1/Notes?user_id=eq.${user}${order}`);
      toast.success("Nota actualizada correctamente", {
        duration: 5000,
        className: "bg-[#333] text-white",
      });
    } catch (error: any) {
      toast.error(error.response.data.message, {
        duration: 5000,
        className: "bg-[#333] text-white",
      });
    }
  };

  return { addNote, editNote };
}
