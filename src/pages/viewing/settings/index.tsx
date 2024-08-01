
import FacultyList from "./faculty-list";
import UpdateModal from "./faculty-modal";
import { useState } from "react";

function FacultyPage() {
  const [facultyId, setFacultyId] = useState<string | null>(null);
  console.log(facultyId)
  
  return (
    <div className="flex h-full flex-col justify-center gap-2 sm:flex-row sm:gap-4">
     

     <FacultyList onFacultyIdChange={setFacultyId} />

      <UpdateModal/>

     
    </div>
  );
}

export default FacultyPage;
