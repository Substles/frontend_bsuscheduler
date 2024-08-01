import MainTable from "@/components/table/root";
import LogoRevision from "@/components/table/rows/metadata/logo-revision";
import TableTitle from "@/components/table/rows/metadata/title";
import CollegeInfo from "@/components/table/rows/metadata/college-info";
import ScheduleInfo from "@/components/table/rows/metadata/schedule-info";
import ScheduleHeader from "@/components/table/rows/schedule-header";
import FacultySchedule from "@/components/table/faculty/view-scheduler";
import FacultySummary from "@/components/table/faculty/view/faculty-summary";
import FacultyTotal from "../../../components/table/faculty/view/faculty-total";
import FacultyList from "@/components/table/faculty/faculty-name";
import { useState } from "react";


function FacultySchedulePage() {
  const [facultyId, setFacultyId] = useState<string | null>(null);

  return (
    <div>
      <MainTable>
        <LogoRevision
          refNumber="01"
          effectivityDate="January 3, 2017"
          revisionNumber="00"
        />

        {/* Table Info */}
        <TableTitle title="faculty schedule" />
        <CollegeInfo />
        <ScheduleInfo category="Name of faculty" Fullname={ <FacultyList  onFacultyIdChange={setFacultyId}/>} />
       
        <ScheduleHeader category="room" />
        <FacultySchedule facultyId = {facultyId}/>
        <FacultyTotal facultyId = {facultyId} />
        <FacultySummary facultyId = {facultyId} />
      </MainTable>
    </div>
  );
}
export default FacultySchedulePage;
