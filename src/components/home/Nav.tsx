import { BsPlus } from "react-icons/bs";
import { BiSortAZ, BiSortDown, BiSortUp, BiSortZA } from "react-icons/bi";
import { useRecoilState } from "recoil";
import { modalState } from "../../atoms/modalState";
import { searchState } from "../../atoms/searchState";
import { notesFilterState } from "../../atoms/notesFilterState";
import Input from "../Input";

export default function Nav() {
  const [modal, setModal] = useRecoilState(modalState);
  const [search, setSearch] = useRecoilState(searchState);
  const [notesFilter, setNotesFilter] = useRecoilState(notesFilterState);

  const handleModal = () => {
    setModal({ visible: true, type: "add" });
  };

  const handleSearchNote = (e: any) => {
    setSearch(e.target.value);
  };

  const handleSortName = () => {
    if (notesFilter === "&order=title.desc") {
      setNotesFilter("&order=title.asc");
    } else {
      setNotesFilter("&order=title.desc");
    }
  };

  const handleSortDate = () => {
    if (notesFilter === "&order=created_at.desc") {
      setNotesFilter("&order=created_at.asc");
    } else {
      setNotesFilter("&order=created_at.desc");
    }
  };

  return (
    <div className="rounded-md bg-neutral-900/70 p-5 flex flex-col md:flex-row gap-5">
      <Input
        name="searcher"
        placeholder="Buscar..."
        onChange={handleSearchNote}
        type="text"
        className="input-bordered rounded-md bg-black/30 w-auto grow"
      />
      <button
        className="btn rounded-md bg-transparent hover:bg-[#080808] flex items-center gap-5 normal-case"
        onClick={handleSortName}
      >
        Nombre{" "}
        {notesFilter === "&order=title.desc" ? (
          <BiSortZA className="text-base" />
        ) : (
          <BiSortAZ className="text-base" />
        )}
      </button>
      <button
        className="btn rounded-md bg-transparent hover:bg-[#080808] flex items-center gap-5 normal-case"
        onClick={handleSortDate}
      >
        Fecha{" "}
        {notesFilter === "&order=created_at.desc" ? (
          <BiSortUp className="text-base" />
        ) : (
          <BiSortDown className="text-base" />
        )}
      </button>
      <button
        onClick={handleModal}
        className="btn btn-success rounded-md flex gap-3"
      >
        Agregar Nota
        <BsPlus size={20} />
      </button>
    </div>
  );
}
