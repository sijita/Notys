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
    <div className="navbar rounded-md bg-neutral-900/70 flex flex-wrap gap-5 p-10 sm:px-10 sm:py-4 max-[500px]:justify-center justify-between items-start md:items-center">
      <div className="flex flex-col gap-5 md:flex-row md:gap-10 items-start max-[500px]:w-full">
        <Input
          name="searcher"
          placeholder="Buscar..."
          onChange={handleSearchNote}
          type="text"
          className="input-bordered rounded-md bg-black/30 sm:w-60"
        />
        <div className="flex flex-wrap gap-3 justify-center max-[500px]:w-full">
          <button
            className="btn bg-transparent hover:bg-[#080808] w-full sm:w-auto flex items-center gap-5 normal-case"
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
            className="btn bg-transparent hover:bg-[#080808] w-full sm:w-auto flex items-center gap-5 normal-case"
            onClick={handleSortDate}
          >
            Fecha{" "}
            {notesFilter === "&order=created_at.desc" ? (
              <BiSortUp className="text-base" />
            ) : (
              <BiSortDown className="text-base" />
            )}
          </button>
        </div>
      </div>
      <button
        onClick={handleModal}
        className="btn btn-success btn-square text-2xl rounded-md max-[500px]:w-full"
      >
        <BsPlus />
      </button>
    </div>
  );
}
