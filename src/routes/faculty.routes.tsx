import FacultySchedulePage from "@/pages/viewing/viewfaculty/faculty-schedule";
import RoomUtilizationPage from "@/pages/viewing/viewroom/room-utilization";
import ClassSchedule from "@/pages/viewing/viewclass/class-shedule";
import FacultyPage from "@/pages/viewing/settings";

export const facultyRoutes = [
  { index: true, element: <FacultySchedulePage /> },
  { path: "rooms", element: <RoomUtilizationPage /> },
  { path: "schedules", element: <ClassSchedule /> },
  { path: "Settings", element: <FacultyPage />  },
  
];


