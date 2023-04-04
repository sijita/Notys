import { BiEditAlt, BiTrashAlt } from "react-icons/bi";
import { axiosClient } from "../../services/apiClient";
import { mutate } from "swr";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "../../atoms/modalState";
import { notesState } from "../../atoms/notesState";
import { userDataState } from "../../atoms/userDataState";
import { toast } from "react-hot-toast";
import { notesFilterState } from "../../atoms/notesFilterState";

interface NotesCardProps {
  title: string;
  content: string;
  date: string;
  id: number;
}

export default function NotesCard({
  title,
  content,
  date,
  id,
}: NotesCardProps) {
  const navigate = useNavigate();
  const dateFormated = new Date(date).toLocaleDateString();
  const { userId } = useRecoilValue(userDataState);
  const order = useRecoilValue(notesFilterState);

  const [modal, setModal] = useRecoilState(modalState);
  const [note, setNote] = useRecoilState(notesState);

  const handleDelete = async () => {
    await axiosClient.delete(`rest/v1/Notes?id=eq.${id}`);
    mutate(`rest/v1/Notes?user_id=eq.${userId}${order}`);
    toast.success("Nota eliminada", {
      duration: 5000,
      className: "bg-[#333] text-white",
    });
  };

  const handleEdit = () => {
    navigate(`/home/edit/${id}`);
    setNote({
      title,
      content,
    });
    setModal({ visible: true, type: "edit" });
  };

  const handleOpenModal = () => {
    setModal({ visible: true, type: "view" });
    setNote({
      title,
      content,
    });
  };

  return (
    <div className="card w-[100%] text-white bg-black/30 rounded-md">
      <div className="card-body gap-5 justify-between">
        <div className="flex flex-wrap gap-5 justify-center sm:justify-between items-center">
          <h3 className="italic text-gray-400">{dateFormated}</h3>
          <div className="flex gap-1">
            <button
              onClick={handleEdit}
              className="btn btn-square btn-sm rounded-md btn-warning text-lg hover:bg-yellow-600 hover:border-yellow-600 hover:scale-95"
            >
              <BiEditAlt />
            </button>
            <button
              className="btn btn-square btn-sm rounded-md btn-error text-lg hover:scale-95 hover:bg-red-500 hover:border-red-500"
              onClick={handleDelete}
            >
              <BiTrashAlt />
            </button>
          </div>
        </div>
        <div
          className="flex flex-col gap-5 
        "
        >
          <h2 className="card-title">{title}</h2>
          <hr className="opacity-5" />
          <p>{content}</p>
        </div>
        <div className="card-actions">
          <button
            onClick={handleOpenModal}
            className="btn w-full rounded-md bg-transparent hover:bg-[#080808] hover:scale-95"
          >
            Abrir
          </button>
        </div>
      </div>
    </div>
  );
}
