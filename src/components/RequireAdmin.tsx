import { Navigate, useLocation } from "react-router-dom";
import { isAdminAuthed } from "@/pages/AdminLogin";

export const RequireAdmin = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  if (!isAdminAuthed()) {
    return <Navigate to="/admin" replace state={{ from: location }} />;
  }
  return children;
};
