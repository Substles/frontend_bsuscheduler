import { createBrowserRouter } from "react-router-dom";

import AdminLayout from "@/layouts/admin-layout";
import UserLayout from "@/layouts/user-layout";
import FacultyLayout from "@/layouts/faculty-layout";
import LoginPage from "@/pages/login";

import { userRoutes } from "./user.routes";
import { adminRoutes } from "./admin.routes";
import FacultyLogin from "@/pages/facultylogin/faculty-login";
import { facultyRoutes } from "./faculty.routes";

export const routes = createBrowserRouter([
  {path: "/login", element: <LoginPage /> },
  {path: "/faculty-login", element: <FacultyLogin />,},
  {path: "/viewfaculty", element: <FacultyLayout />, children: facultyRoutes,},
  {path: "/admin", element: <AdminLayout />, children: adminRoutes,},
  {path: "/", element: <UserLayout />, children: userRoutes,},
]);
