import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "../atoms/modalState";
import { axiosClient } from "../services/apiClient";
import Note from "../types/note";
import { mutate } from "swr";
import { ToastType, toast } from "react-hot-toast";
import { notesFilterState } from "../atoms/notesFilterState";

export default function useAddNote() {
  const [modal, setModal] = useRecoilState(modalState);
  const order = useRecoilValue(notesFilterState);
  let loadingToastId: string;

  const addNote = async (note: Note, userId: string) => {
    try {
      loadingToastId = toast.loading("Agregando nota...");
      await axiosClient.post("rest/v1/Notes", {
        title: note.title,
        content: note.content,
        user_id: userId,
      });

      toast.dismiss(loadingToastId);
      mutate(`rest/v1/Notes?user_id=eq.${userId}${order}`);
      setModal({ visible: false, type: "" });

      return toast.success("Nota agregada correctamente");
    } catch (error: any) {
      return toast.error(error.response.data.message);
    }
  };

  const editNote = async (
    id: string | undefined,
    note: Note,
    userId: string
  ) => {
    try {
      loadingToastId = toast.loading("Actualizando nota...");
      await axiosClient.patch(`rest/v1/Notes?id=eq.${id}`, {
        title: note.title,
        content: note.content,
        user_id: userId,
      });

      toast.dismiss(loadingToastId);
      setModal({ visible: false, type: "" });
      mutate(`rest/v1/Notes?user_id=eq.${userId}${order}`);

      return toast.success("Nota actualizada correctamente");
    } catch (error: any) {
      return toast.error(error.response.data.message);
    }
  };

  return { addNote, editNote };
}
