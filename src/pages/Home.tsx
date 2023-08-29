import Nav from "../components/home/Nav";
import NotesBody from "../components/home/NotesBody";
import Modal from "../components/Modal";
import NoteForm from "../components/home/NoteForm";
import Dropdown from "../components/home/Dropdown";
import { BiFace, BiLogOutCircle } from "react-icons/bi";
import { useNavigate, Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userDataState } from "../atoms/userDataState";

export default function Home() {
  const [userData, setUserData] = useRecoilState(userDataState);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserData({
      userId: "",
      accessToken: "",
    });
    navigate("/");
  };

  return (
    <div className="bg-[#080808] text-white min-h-screen">
      <div className="container mx-auto px-4 py-10 flex flex-col gap-5">
        <div className="flex justify-between items-center mb-10">
          <Link to="/" className="text-5xl font-bold">
            Notys
          </Link>
          <Dropdown
            dropdownUbi="dropdown-end"
            icon={<BiFace className="text-2xl" />}
            iconClassName="btn btn-square"
            items={
              <li className="rounded-md">
                <button
                  onClick={handleLogout}
                  className="flex justify-between hover:bg-red-500 rounded-md active:bg-red-500 focus:bg-red-500"
                >
                  Cerrar sesión
                  <BiLogOutCircle />
                </button>
              </li>
            }
          />
        </div>
        <Nav />
        <NotesBody />
      </div>
      <Modal>
        <NoteForm />
      </Modal>
    </div>
  );
}
