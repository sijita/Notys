import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalState";
import { useNavigate } from "react-router-dom";
import { notesState } from "../atoms/notesState";

export default function Modal({ children }: React.PropsWithChildren) {
  const [modal, setModal] = useRecoilState(modalState);
  const [note, setNote] = useRecoilState(notesState);
  const navigate = useNavigate();

  const handleModal = () => {
    setNote({
      title: "",
      content: "",
    });
    setModal({ visible: false, type: "" });
    navigate("/home");
  };

  return (
    <div
      className={`fixed top-0 bottom-0 left-0 right-0 flex justify-center z-50 transition-all overflow-y-hidden overscroll-contain items-center ${
        modal.visible
          ? "opacity-100 visible backdrop-brightness-50 backdrop-blur-[2px]"
          : "opacity-0 hidden"
      }`}
    >
      <div className="modal-box bg-neutral-900 flex flex-col gap-10">
        <h2 className="font-bold text-2xl text-center uppercase">
          {modal.type === "add"
            ? "Añadir nota"
            : modal.type === "edit"
            ? "Editar nota"
            : "Ver nota"}
        </h2>
        <div>{children}</div>
        <button
          className="btn bg-transparent hover:bg-red-500"
          onClick={handleModal}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
