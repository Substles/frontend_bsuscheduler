import { Outlet } from "react-router-dom";
import Header2 from "./header/header2";
import useAuth from "@/hooks/useAuth";

function FacultyLayout() {
  const permission = useAuth();
 

  if (permission !== "faculty") return;

  return (
    <div className="flex h-screen min-h-screen flex-col">
      <Header2 />

      <main className="container flex-1 py-2">
        <Outlet />
      </main>
    </div>
  );
}

export default FacultyLayout;
