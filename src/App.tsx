import { Routes, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userDataState } from "./atoms/userDataState";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  const userData = useRecoilValue(userDataState);

  return (
    <Routes>
      <Route index element={<Login user={userData.userId} />} />
      <Route element={<ProtectedRoute user={userData.userId} />}>
        <Route path="/home" element={<Home />} />
        <Route path="/home/edit/:id" element={<Home />} />
      </Route>
      <Route path="*" element={<p>No se encontró la ruta</p>} />
    </Routes>
  );
}

export default App;
