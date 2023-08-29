import { useRecoilState, useRecoilValue } from "recoil";
import { notesState } from "../../atoms/notesState";
import Input from "../Input";
import { modalState } from "../../atoms/modalState";
import { useParams } from "react-router-dom";
import useAddNote from "../../hooks/useNoteOps";
import { userDataState } from "../../atoms/userDataState";

export default function NoteForm() {
  const { id } = useParams();

  const { addNote, editNote } = useAddNote();
  const [note, setNote] = useRecoilState(notesState);
  const modal = useRecoilValue(modalState);
  const { userId } = useRecoilValue(userDataState);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (modal.type === "add") {
      await addNote(note, userId);
    } else if (modal.type === "edit") {
      await editNote(id, note, userId);
    }

    setNote({
      title: "",
      content: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <p className="text-xl font-bold">Título de la nota</p>
          <Input
            name="title"
            value={note.title}
            type="text"
            placeholder="Introduce un texto"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNote((prev) => ({ ...prev, title: e.target.value }));
            }}
            className="text-white text-lg bg-black/30 disabled:bg-black/30 disabled:text-gray-400 disabled:border-1 disabled:border-black"
            disabled={modal.type === "view"}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold">Contenido</p>
          <textarea
            name="content"
            value={note.content}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setNote((prev) => ({ ...prev, content: e.target.value }));
            }}
            placeholder="Contenido de la nota"
            className="textarea textarea-bordered textarea-md w-full text-white text-lg bg-black/30 disabled:bg-black/30 disabled:text-gray-400 disabled:border-1 disabled:border-black max-h-20"
            disabled={modal.type === "view"}
          />
        </div>
        {modal.type !== "view" && (
          <button className="btn btn-success">Guardar</button>
        )}
      </form>
    </div>
  );
}
