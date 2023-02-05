import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ user }: any) {
  if (!user) return <Navigate to="/" />;

  return <Outlet />;
}
