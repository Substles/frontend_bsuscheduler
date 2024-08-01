import FacultySchedulePage from "@/pages/user/faculty-schedule";
import RoomUtilizationPage from "@/pages/user/room-utilization";
import ClassSchedulePage from "@/pages/user/class-shedule";
// import Settings from "@/pages/user/Settings";

export const userRoutes = [
  {
    index: true,
    element: <FacultySchedulePage />,
  },
  {
    path: "/rooms",
    element: <RoomUtilizationPage />,
  },
  {
    path: "/schedules",
    element: <ClassSchedulePage />,
  },

  // {
  //   path: "/settings",
  //   element: <Settings/>
  // },
];
