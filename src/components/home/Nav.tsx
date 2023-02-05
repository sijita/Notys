import { BsPlus } from "react-icons/bs";
import { BiSortAZ, BiSortDown, BiSortUp, BiSortZA } from "react-icons/bi";
import { useRecoilState } from "recoil";
import { modalState } from "../../atoms/modalState";
import { searchState } from "../../atoms/searchState";
import { notesFilterState } from "../../atoms/notesFilterState";
import Input from "../Input";
import Swap from "./Swap";

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

  return (
    <div className="navbar rounded-md bg-neutral-900/70 flex flex-wrap gap-5 p-4 px-10 max-[500px]:justify-center justify-between items-start md:items-center">
      <div className="flex flex-col gap-5 md:flex-row md:gap-10 items-start max-[500px]:w-full">
        <Input
          name="searcher"
          placeholder="Buscar..."
          onChange={handleSearchNote}
          type="text"
          className="input-bordered rounded-md bg-black/30 sm:w-60"
        />
        <div className="flex flex-wrap gap-3 justify-center max-[500px]:w-full">
          <Swap
            swapOn={
              <>
                Nombre <BiSortAZ className="text-base" />
              </>
            }
            swapOff={
              <>
                Nombre <BiSortZA className="text-base" />
              </>
            }
            buttonOn={() => setNotesFilter("&order=title.asc")}
            buttonOff={() => setNotesFilter("&order=title.desc")}
          />
          <Swap
            swapOn={
              <>
                Fecha <BiSortUp className="text-base" />
              </>
            }
            swapOff={
              <>
                Fecha <BiSortDown className="text-base" />
              </>
            }
            buttonOn={() => setNotesFilter("&order=created_at.asc")}
            buttonOff={() => setNotesFilter("&order=created_at.desc")}
          />
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
